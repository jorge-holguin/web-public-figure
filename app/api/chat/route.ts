// /app/api/chat/route.ts
import { NextRequest } from "next/server";
import admin from "firebase-admin";
import { askDeepSeekStream } from "../../../lib/deepseek";

// Definición de la interfaz para los mensajes de conversación
interface ConversationMessage {
  role: string;
  content: string;
}

// Inicializar Firebase Admin si no está inicializado
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)),
  });
}
const db = admin.firestore();

// Nombre de la colección para almacenar conversaciones
const CONVERSATIONS_COLLECTION = "conversations";
const CACHE_COLLECTION = "chat_responses";

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId } = await req.json();
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: "No se proporcionó un mensaje válido." }), 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log(`Recibida consulta para la sesión: ${sessionId || 'sin-sesión'}`);
    
    // Verificamos que sessionId exista
    if (!sessionId) {
      console.warn("No se proporcionó un sessionId. Es recomendable para mantener el contexto.");
    }
    
    // Recuperar historial de conversación si hay un sessionId
    let conversationHistory: ConversationMessage[] = [];
    
    if (sessionId) {
      const conversationDoc = await db.collection(CONVERSATIONS_COLLECTION).doc(sessionId).get();
      if (conversationDoc.exists) {
        const data = conversationDoc.data();
        conversationHistory = data?.history as ConversationMessage[] || [];
        console.log(`Historial recuperado para la sesión ${sessionId}, mensajes: ${conversationHistory.length}`);
      } else {
        console.log(`Creando nueva conversación con ID: ${sessionId}`);
        // Inicializamos la colección
        await db.collection(CONVERSATIONS_COLLECTION).doc(sessionId).set({
          history: [],
          created: admin.firestore.FieldValue.serverTimestamp(),
          lastUpdated: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    }

    // Verificar si existe respuesta en Firestore (cache)
    // Solo usamos caché para mensajes sin contexto de conversación
    let cachedResponse: string | undefined;
    
    if (conversationHistory.length === 0) {
      const docRef = db.collection(CACHE_COLLECTION).doc(message);
      const doc = await docRef.get();
      
      if (doc.exists) {
        const data = doc.data();
        if (data && data.response) {
          console.log("Usando respuesta cacheada para:", message);
          cachedResponse = data.response;
          
          // Si hay respuesta cacheada, la devolvemos como streaming simulado
          const encoder = new TextEncoder();
          const stream = new ReadableStream({
            start(controller) {
              // Dividir la respuesta en partes para simular streaming
              const chunks = cachedResponse!.match(/.{1,20}/g) || [];
              
              // Enviar cada parte con un pequeño retraso para simular streaming
              chunks.forEach((chunk, i) => {
                setTimeout(() => {
                  controller.enqueue(encoder.encode(chunk));
                  if (i === chunks.length - 1) {
                    controller.close();
                    
                    // Actualizar el historial después de enviar toda la respuesta
                    if (sessionId) {
                      const updatedHistory = [
                        ...conversationHistory,
                        { role: "user", content: message },
                        { role: "assistant", content: cachedResponse! }
                      ];
                      
                      db.collection(CONVERSATIONS_COLLECTION).doc(sessionId).set({
                        history: updatedHistory,
                        lastUpdated: admin.firestore.FieldValue.serverTimestamp()
                      }, { merge: true });
                    }
                  }
                }, i * 30); // Pequeños intervalos para simular typewriter effect
              });
            }
          });
          
          return new Response(stream, {
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Cache-Control": "no-cache",
              "Connection": "keep-alive"
            }
          });
        }
      }
    }

    // Si no hay respuesta cacheada, generar nueva respuesta con streaming
    console.log("Generando nueva respuesta con DeepSeek en modo streaming");
    console.log("Historial enviado a DeepSeek:", JSON.stringify(conversationHistory));
    
    // Crear un stream para la respuesta
    const stream = await askDeepSeekStream(message, conversationHistory);
    
    // Capturar la respuesta completa para guardarla después
    let completeResponse = '';
    const originalReader = stream.getReader();
    const decoder = new TextDecoder();
    
    // Crear un nuevo stream transformado
    const transformedStream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await originalReader.read();
            if (done) break;
            
            const chunkText = decoder.decode(value, { stream: true });
            completeResponse += chunkText;
            controller.enqueue(value);
          }
          
          // Cuando termina, guardamos la respuesta completa y actualizamos el historial
          controller.close();
          
          // Guardar en caché si es la primera interacción
          if (conversationHistory.length === 0) {
            console.log("Guardando respuesta en caché");
            await db.collection(CACHE_COLLECTION).doc(message).set({ 
              response: completeResponse, 
              timestamp: admin.firestore.FieldValue.serverTimestamp() 
            });
          }
          
          // Actualizar el historial de conversación
          if (sessionId) {
            const updatedHistory = [
              ...conversationHistory,
              { role: "user", content: message },
              { role: "assistant", content: completeResponse }
            ];
            
            await db.collection(CONVERSATIONS_COLLECTION).doc(sessionId).set({
              history: updatedHistory,
              lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
            
            console.log(`Historial actualizado para la sesión ${sessionId}, mensajes: ${updatedHistory.length}`);
          }
        } catch (e) {
          controller.error(e);
        }
      }
    });
    
    // Devolver el stream transformado como respuesta
    return new Response(transformedStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      }
    });
    
  } catch (error) {
    console.error("Error en /api/chat:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor." }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}