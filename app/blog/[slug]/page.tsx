import React from "react"; // Agrega esta línea
import { getBlogPosts } from "@/lib/notion";
import { notFound } from "next/navigation";
import Image from "next/image";
import { transformNotionImageUrl } from "@/lib/utils";

export const revalidate = 1800;

interface NotionRichText {
  type: string;
  text: {
    content: string;
    link: { url: string } | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

function renderRichText(richTexts: NotionRichText[]): JSX.Element[] {
  return richTexts.map((richText, idx) => {
    const { annotations, text } = richText;
    const style: React.CSSProperties = {
      fontWeight: annotations.bold ? "bold" : "normal",
      fontStyle: annotations.italic ? "italic" : "normal",
      textDecoration:
        annotations.underline
          ? "underline"
          : annotations.strikethrough
          ? "line-through"
          : "none",
      color: annotations.color !== "default" ? annotations.color : "inherit",
    };

    // Separamos el contenido por saltos de línea
    const lines = text.content.split("\n");
    const content = lines.map((line, lineIdx) => (
      <React.Fragment key={lineIdx}>
        {line}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    ));

    if (text.link) {
      return (
        <a key={idx} href={text.link.url} style={style}>
          {content}
        </a>
      );
    }
    return (
      <span key={idx} style={style}>
        {content}
      </span>
    );
  });
}

export async function generateStaticParams() {
  const blogs = await getBlogPosts();
  if (!blogs || blogs.length === 0) {
    console.warn("No se encontraron blogs en Notion.");
    return [];
  }
  return blogs
    .filter((post) => post.slug && post.slug.trim() !== "")
    .map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const blogs = await getBlogPosts();
  if (!blogs || blogs.length === 0) {
    console.error("[BlogPost] No se encontraron blogs.");
    return notFound();
  }
  const post = blogs.find((p) => p.slug === params.slug);
  if (!post) {
    console.error("[BlogPost] No se encontró el post para slug:", params.slug);
    return notFound();
  }
  console.log("[BlogPost] Post encontrado:", post.title, "Con imagen:", post.image);
  const transformedUrl = transformNotionImageUrl(post.image);
  console.log("[BlogPost] URL transformada:", transformedUrl);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {post.image ? (
        <Image
          src={transformedUrl}
          alt={post.title}
          width={800}
          height={400}
          priority
          className="w-full h-64 object-cover rounded-lg"
          unoptimized={true}
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
      <div className="mt-4 text-gray-600 dark:text-gray-300" style={{ textAlign: "justify" }}>
        {renderRichText(post.content)}
      </div>
    </div>
  );
}
