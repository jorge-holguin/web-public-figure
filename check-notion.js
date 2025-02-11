import fetch from 'node-fetch';
import fs from 'fs';

const NOTION_API_URL = `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`;
const NOTION_API_KEY = `Bearer ${process.env.NOTION_SECRET}`;
const LAST_UPDATED_FILE = "last_updated.txt"; // Para guardar la última fecha de edición
const VERCEL_WEBHOOK = process.env.VERCEL_WEBHOOK; // Webhook de redeploy

async function checkNotionChanges() {
  try {
    console.log("[checkNotionChanges] Consultando Notion...");
    const res = await fetch(NOTION_API_URL, {
      method: "POST",
      headers: {
        "Authorization": NOTION_API_KEY,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
      },
      body: JSON.stringify({})
    });

    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      console.log("[checkNotionChanges] ⚠️ No se encontraron resultados en Notion.");
      return;
    }

    const lastUpdated = data.results[0].last_edited_time;
    console.log("[checkNotionChanges] Última actualización en Notion:", lastUpdated);

    let lastStoredDate = "";
    if (fs.existsSync(LAST_UPDATED_FILE)) {
      lastStoredDate = fs.readFileSync(LAST_UPDATED_FILE, "utf-8").trim();
    }
    console.log("[checkNotionChanges] Última fecha almacenada:", lastStoredDate);

    if (lastUpdated !== lastStoredDate) {
      console.log("[checkNotionChanges] 🚀 Cambios detectados, disparando redeploy en Vercel...");
      const deployResponse = await fetch(VERCEL_WEBHOOK, { method: "POST" });
      console.log("[checkNotionChanges] Respuesta del deploy:", deployResponse.status);
      fs.writeFileSync(LAST_UPDATED_FILE, lastUpdated);
    } else {
      console.log("[checkNotionChanges] ✅ No hay cambios en Notion, no se hará redeploy.");
    }
  } catch (error) {
    console.error("[checkNotionChanges] ❌ Error al consultar Notion:", error);
  }
}

checkNotionChanges();
