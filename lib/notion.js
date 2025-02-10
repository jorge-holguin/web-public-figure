// lib/notion.js
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_SECRET });

export async function getBlogPosts() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ property: "Date", direction: "descending" }],
  });

  return response.results.map((page) => {
    // Extraer la URL de la imagen considerando que puede venir como file o external
    const featuredImageObj = page.properties["Featured Image"]?.files?.[0];
    let imageUrl = "https://via.placeholder.com/600";
    if (featuredImageObj) {
      if (featuredImageObj.type === "file") {
        imageUrl = featuredImageObj.file.url;
      } else if (featuredImageObj.type === "external") {
        imageUrl = featuredImageObj.external.url;
      }
    }

    return {
      id: page.id,
      title:
        page.properties.Título?.title?.map((t) => t.plain_text).join("") || "Sin título",
      excerpt:
        page.properties.Excerpt?.rich_text?.map((t) => t.plain_text).join("") || "",
      date: page.properties.Date?.date?.start || "",
      slug:
        page.properties.Slug?.rich_text?.map((t) => t.plain_text).join("") || "",
      content: page.properties.Content?.rich_text || [],
      image: imageUrl,
    };
  });
}

export async function getLeyesProyectos() {
  const databaseId = process.env.NOTION_LEYES_DATABASE_ID;

  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ property: "Fecha", direction: "descending" }],
  });

  console.log("🔍 Respuesta de Notion:", JSON.stringify(response.results, null, 2));

  const leyes = response.results.map((page) => {
    const titulo =
      page.properties.Título?.title?.map((t) => t.plain_text).join("") || "Sin título";
    const descripcion =
      page.properties.Descripción?.rich_text?.map((t) => t.plain_text).join("") ||
      "Sin descripción";
    const fecha = page.properties.Fecha?.date?.start || "Fecha desconocida";
    const estado = page.properties.Estado?.status?.name || "Desconocido";
    const url = page.properties.URL?.url || null;

    return {
      id: page.id,
      titulo,
      descripcion,
      fecha,
      estado,
      url,
    };
  });

  return leyes;
}
