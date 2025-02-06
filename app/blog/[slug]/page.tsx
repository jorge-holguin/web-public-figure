// app/blog/[slug]/page.tsx
import { getBlogPosts } from "@/lib/notion";
import { notFound } from "next/navigation";
import Image from "next/image";

export const revalidate = 1800; // La página se revalidará cada 30 minutos

// Función para renderizar el array de rich text en JSX, respetando las anotaciones
function renderRichText(richTexts: any[]) {
  return richTexts.map((richText, idx) => {
    const { annotations, text } = richText;
    const style: React.CSSProperties = {
      fontWeight: annotations.bold ? 'bold' : 'normal',
      fontStyle: annotations.italic ? 'italic' : 'normal',
      textDecoration:
        annotations.underline
          ? 'underline'
          : annotations.strikethrough
          ? 'line-through'
          : 'none',
      color: annotations.color !== 'default' ? annotations.color : 'inherit',
    };

    if (text.link) {
      return (
        <a key={idx} href={text.link.url} style={style}>
          {text.content}
        </a>
      );
    }
    return (
      <span key={idx} style={style}>
        {text.content}
      </span>
    );
  });
}

// Genera los parámetros estáticos filtrando posts sin slug válido
export async function generateStaticParams() {
  const blogs = await getBlogPosts();

  if (!blogs || blogs.length === 0) {
    console.warn("⚠️ No se encontraron blogs en Notion. No se generarán páginas estáticas.");
    return [];
  }

  return blogs
    .filter((post) => post.slug && post.slug.trim() !== "")
    .map((post) => ({ slug: post.slug }));
}

// Página de detalle del blog
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const blogs = await getBlogPosts();

  if (!blogs || blogs.length === 0) {
    console.error("❌ Error: No se encontraron blogs.");
    return notFound();
  }

  const post = blogs.find((p) => p.slug === params.slug);

  if (!post) {
    console.error(`❌ Error: No se encontró el post con slug: ${params.slug}`);
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {post.image ? (
        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={400}
          priority
          className="w-full h-64 object-cover rounded-lg"
          unoptimized={true} // Para imágenes externas sin optimización
        />
      ) : (
        <p className="text-gray-500">⚠️ Imagen no disponible</p>
      )}

      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-6">
        {post.title}
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        {post.date ? new Date(post.date).toLocaleDateString() : "Fecha no disponible"}
      </p>
      <div
        className="mt-4 text-gray-600 dark:text-gray-300"
        style={{ textAlign: "justify" }} // Esto justifica el contenido
      >
        {renderRichText(post.content)}
      </div>
    </div>
  );
}
