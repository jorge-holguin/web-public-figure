import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_SECRET });

export async function getBlogPosts() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ property: "Date", direction: "descending" }],
  });

  return response.results.map((page) => ({
    id: page.id,
    title: page.properties.Título?.title[0]?.text?.content || "Sin título",
    excerpt: page.properties.Excerpt?.rich_text[0]?.text?.content || "",
    date: page.properties.Date?.date?.start || "",
    slug: page.properties.Slug?.rich_text[0]?.text?.content || "",
    content: page.properties.Content?.rich_text[0]?.text?.content || "Sin contenido.",
    image:
      page.properties["Featured Image"]?.files[0]?.file?.url ||
      "https://via.placeholder.com/600",
  }));
}
