// /app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import { askDeepSeek } from "../../../lib/deepseek";

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
      return NextResponse.json({ error: "No se proporcionó un mensaje válido." }, { status: 400 });
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
    let answer: string | undefined;
    
    if (conversationHistory.length === 0) {
      const docRef = db.collection(CACHE_COLLECTION).doc(message);
      const doc = await docRef.get();
      
      if (doc.exists) {
        const data = doc.data();
        if (data && data.response) {
          console.log("Usando respuesta cacheada para:", message);
          answer = data.response;
          
          // Actualizar el historial de conversación con la respuesta cacheada
          conversationHistory = [
            { role: "user", content: message },
            { role: "assistant", content: answer }
          ];
        }
      }
    }

    // Si no hay respuesta cacheada, generar nueva respuesta
    if (!answer) {
      console.log("Generando nueva respuesta con DeepSeek");
      console.log("Historial enviado a DeepSeek:", JSON.stringify(conversationHistory));
      
      // Llamamos a askDeepSeek con el historial de conversación
      const result = await askDeepSeek(message, conversationHistory);
      answer = result.content ?? undefined;
      conversationHistory = result.updatedHistory;
      
      // Solo guardamos en caché si es una consulta sin contexto de conversación previo
      if (conversationHistory.length <= 2) {
        await db.collection(CACHE_COLLECTION).doc(message).set({ 
          response: answer, 
          timestamp: admin.firestore.FieldValue.serverTimestamp() 
        });
        console.log("Respuesta guardada en caché");
      }
    }

    // Guardar o actualizar el historial de conversación si hay un sessionId
    if (sessionId) {
      await db.collection(CONVERSATIONS_COLLECTION).doc(sessionId).set({
        history: conversationHistory,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      console.log(`Historial actualizado para la sesión ${sessionId}, mensajes: ${conversationHistory.length}`);
    }

    console.log("Historial final:", JSON.stringify(conversationHistory));

    return NextResponse.json({ 
      response: answer,
      conversationHistory 
    });
  } catch (error) {
    console.error("Error en /api/chat:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}