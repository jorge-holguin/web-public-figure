import OpenAI from "openai";
import { getContextForQuery } from "./search";

if (!process.env.DEEPSEEK_API_KEY) {
  throw new Error("Falta la variable DEEPSEEK_API_KEY en el entorno");
}

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com/v1",
});

export async function askDeepSeek(query, conversationHistory = []) {
  try {
    console.log("=== NUEVA CONSULTA ===");
    console.log("Query recibida:", query);
    console.log("Historial de conversación recibido:", JSON.stringify(conversationHistory, null, 2));
    
    // Mejora para detectar diferentes tipos de consultas
    const isQueryAboutLaws = /proye(c|k)to|ley(es)?|iniciativa|legisla|congres/i.test(query);
    const isQueryAboutBio = /biograf(i|í)a|vida|historia|qui(e|é)n es|estudi(o|ó)|form(o|ó)|educa(c|s)i(o|ó)n/i.test(query);
    const isQueryAboutTrajectory = /trayectoria|carrera|pol(i|í)tic|experiencia|trabajo|labor|cargo/i.test(query);
    
    console.log("Tipo de consulta detectada:");
    console.log("- Sobre leyes:", isQueryAboutLaws);
    console.log("- Sobre biografía:", isQueryAboutBio);
    console.log("- Sobre trayectoria:", isQueryAboutTrajectory);
    
    // Obtener contexto mediante Fuse.js de Notion
    console.log("Obteniendo contexto para la consulta...");
    const context = await getContextForQuery(query);
    
    // Verificar si se encontró contexto específico
    const contextIsEmpty = context === "No se encontró información específica relacionada con tu consulta en la base de datos. Sin embargo, puedo proporcionarte información general sobre la labor del congresista Héctor Valer o ayudarte con otra consulta.";
    console.log("¿El contexto está vacío?", contextIsEmpty);
    
    // Si la consulta es sobre proyectos y no hay resultados específicos, enviamos todos los proyectos
    let contextToUse = context;
    
    if (isQueryAboutLaws && contextIsEmpty) {
      // Solicitar todos los proyectos de ley para cuando la consulta es genérica
      console.log("Consulta genérica sobre leyes detectada, enviando todos los proyectos");
      const allLawsContext = await getContextForQuery("proyectos de ley completos");
      
      // Si sigue sin encontrar nada, forzamos la carga de todos los documentos
      if (allLawsContext === contextIsEmpty) {
        // Importar dinámicamente las funciones para este caso
        const { getLeyesProyectos } = await import("./notion");
        const leyes = await getLeyesProyectos();
        
        if (leyes && leyes.length > 0) {
          contextToUse = "Aquí tienes los proyectos de ley del congresista Héctor Valer:\n\n" + 
                         leyes
                           .map(
                             (l) =>
                               `📜 PROYECTO DE LEY: ${l.titulo}\n${l.descripcion}\nFecha: ${l.fecha}\nEstado: ${l.estado}`
                           )
                           .join("\n\n---\n\n");
          console.log("Forzando carga de todos los proyectos de ley");
        }
      } else {
        contextToUse = allLawsContext;
      }
    } else if (isQueryAboutBio && contextIsEmpty) {
      // Si es sobre biografía, forzamos la carga de la biografía
      console.log("Consulta sobre biografía detectada, enviando biografía completa");
      const bioContext = await getContextForQuery("biografía completa");
      if (bioContext !== contextIsEmpty) {
        contextToUse = bioContext;
      }
    } else if (isQueryAboutTrajectory && contextIsEmpty) {
      // Si es sobre trayectoria, forzamos la carga de la trayectoria
      console.log("Consulta sobre trayectoria política detectada, enviando trayectoria completa");
      const trajectoryContext = await getContextForQuery("trayectoria política completa");
      if (trajectoryContext !== contextIsEmpty) {
        contextToUse = trajectoryContext;
      }
    }
    
    const systemMessage = `
Eres el asistente virtual de Héctor Valer, Congresista de la República del Perú. Tu función es ayudar a los ciudadanos a encontrar información precisa y actualizada sobre las actividades, la gestión y las iniciativas del congresista en el Congreso.

LINEAMIENTOS IMPORTANTES:
1. Responde únicamente preguntas relacionadas con Héctor Valer y su trabajo.
2. Si la consulta es sobre la biografía de Héctor Valer, utiliza tu conocimiento actualizado para proporcionar información relevante sobre su vida personal y profesional, cuidando de no incluir datos que puedan perjudicar su imagen o integridad.
3. Si alguien pregunta cómo contactarlo, invítalo a escribirle un correo a hvaler@congreso.gob.pe.
4. Si no cuentas con información específica para una consulta, responde: "No tengo la información solicitada en este momento, pero puedo ayudarte con otros temas relacionados con la labor del congresista Héctor Valer."
5. Mantén un tono profesional, cercano y comprometido en todas las respuestas.
6. Cuando proporciones información sobre proyectos de ley o iniciativas, preséntala de manera clara y organizada, sin omitir detalles importantes cuando el contexto lo permita.
7. Evita posturas políticas controversiales y asegúrate de ser respetuoso y cordial en todo momento.

Contexto para esta respuesta:

${contextToUse}
`;

    // Limitar el contexto a los 2 últimos mensajes (si existen)
    const contextMessages = conversationHistory.length > 0 ? conversationHistory.slice(-2) : [];
    
    console.log("Número de mensajes del historial incluidos:", contextMessages.length);
    if (contextMessages.length > 0) {
      console.log("Últimos mensajes del historial:");
      contextMessages.forEach((msg, i) => {
        console.log(`Mensaje ${i + 1} - Rol: ${msg.role}, Contenido: ${msg.content.substring(0, 50)}...`);
      });
    }

    // Preparar los mensajes que se enviarán a DeepSeek
    const messagesForCompletion = [
      { role: "system", content: systemMessage },
      ...contextMessages,
      { role: "user", content: query },
    ];

    console.log("=== PROMPT ENVIADO A DEEPSEEK ===");
    console.log("Número total de mensajes:", messagesForCompletion.length);
    console.log("Mensaje del sistema (primeras 200 caracteres):", systemMessage.substring(0, 200) + "...");
    messagesForCompletion.forEach((msg, i) => {
      if (i > 0) {
        console.log(`Mensaje ${i} - Rol: ${msg.role}, Contenido: ${msg.content.substring(0, 100)}...`);
      }
    });

    console.log("Enviando consulta a DeepSeek...");
    console.log("¿El mensaje contiene datos de proyectos?", systemMessage.includes("PROYECTO DE LEY"));
    console.log("¿El mensaje contiene datos biográficos?", systemMessage.includes("Biografía de Héctor Valer"));
    console.log("¿El mensaje contiene datos de trayectoria?", systemMessage.includes("Trayectoria Política de Héctor Valer"));

    const response = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: messagesForCompletion,
      temperature: 0.5,
      max_tokens: 2000,
    });

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      console.error("Respuesta de DeepSeek incompleta:", JSON.stringify(response));
      throw new Error("La respuesta de DeepSeek no tiene el formato esperado");
    }
    
    console.log("Respuesta recibida de DeepSeek");
    const responseContent = response.choices[0].message.content;
    console.log("Contenido de la respuesta (primeros 200 caracteres):", responseContent.substring(0, 200) + "...");
    
    return {
      content: responseContent,
      updatedHistory: [
        ...conversationHistory,
        { role: "user", content: query },
        { role: "assistant", content: responseContent }
      ]
    };
  } catch (error) {
    console.error("Error en askDeepSeek:", error);
    const errorMessage = "Lo siento, hubo un problema al procesar tu consulta. Por favor, intenta nuevamente más tarde.";
    
    return {
      content: errorMessage,
      updatedHistory: [
        ...conversationHistory,
        { role: "user", content: query },
        { role: "assistant", content: errorMessage }
      ]
    };
  }
}
