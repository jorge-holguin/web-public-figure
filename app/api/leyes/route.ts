import { getLeyesProyectos } from "../../../lib/notion";

export async function GET() {
  try {
    const leyes = await getLeyesProyectos();
    return Response.json(leyes);
  } catch (error) {
    console.error("Error obteniendo proyectos de ley:", error);
    return Response.json({ error: "No se pudieron obtener los proyectos de ley" }, { status: 500 });
  }
}
