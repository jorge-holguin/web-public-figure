import { getBlogPosts } from "../../../lib/notion";

export async function GET() {
  try {
    const blogs = await getBlogPosts();
    return Response.json(blogs);
  } catch (error) {
   console.error("Error obteniendo blogs desde Notion:", error);
    return Response.json({ error: "No se pudieron obtener los blogs" }, { status: 500 });
  }
}
