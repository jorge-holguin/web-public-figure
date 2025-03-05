import React from "react"
import { getBlogPosts } from "@/lib/notion"
import { notFound } from "next/navigation"
import Image from "next/image"
import { transformNotionImageUrl } from "@/lib/utils"
import type { Metadata } from "next"

// Interfaz para el rich text de Notion
interface NotionRichText {
  type: string
  text: {
    content: string
    link: { url: string } | null
  }
  annotations: {
    bold: boolean
    italic: boolean
    underline: boolean
    strikethrough: boolean
    code: boolean
    color: string
  }
  plain_text: string
  href: string | null
}

function renderRichText(richTexts: NotionRichText[]): JSX.Element[] {
  return richTexts.map((richText, idx) => {
    const { annotations, text } = richText
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
    }

    const lines = text.content.split("\n")
    const content = lines.map((line, lineIdx) => (
      <React.Fragment key={lineIdx}>
        {line}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    ))

    if (text.link) {
      return (
        <a key={idx} href={text.link.url} style={style}>
          {content}
        </a>
      )
    }
    return (
      <span key={idx} style={style}>
        {content}
      </span>
    )
  })
}

// Función para generar los parámetros estáticos
export async function generateStaticParams() {
  const blogs = await getBlogPosts()
  if (!blogs || blogs.length === 0) {
    console.warn("[generateStaticParams] No se encontraron blogs en Notion.")
    return []
  }
  return blogs
    .filter((post) => post.slug && post.slug.trim() !== "")
    .map((post) => ({ slug: post.slug }))
}

// Función para generar metadatos dinámicos para cada post
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const blogs = await getBlogPosts()
  const post = blogs.find((p) => p.slug === params.slug)

  if (!post) {
    console.error("[generateMetadata] No se encontró el post para slug:", params.slug)
    return {
      title: "Post no encontrado",
      description: "No se encontró el post.",
    }
  }

  const imageUrl = transformNotionImageUrl(post.image)

  return {
    title: `${post.title} | Blog Héctor Valer`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Blog Héctor Valer`,
      description: post.excerpt,
      url: `https://hectorvaler.com/blog/${post.slug}`,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Blog Héctor Valer`,
      description: post.excerpt,
      images: [imageUrl],
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  console.log("[BlogPost] Iniciando carga para slug:", params.slug)
  const blogs = await getBlogPosts()
  if (!blogs || blogs.length === 0) {
    console.error("[BlogPost] No se encontraron blogs.")
    return notFound()
  }
  const post = blogs.find((p) => p.slug === params.slug)
  if (!post) {
    console.error("[BlogPost] No se encontró el post para slug:", params.slug)
    return notFound()
  }
  console.log("[BlogPost] Post encontrado:", post.title, "Con imagen:", post.image)
  const transformedUrl = transformNotionImageUrl(post.image)
  console.log("[BlogPost] URL transformada:", transformedUrl)

  return (
    <article className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {post.image && (
        <Image
          src={transformedUrl || "/placeholder.svg"}
          alt={post.title}
          width={800}
          height={400}
          priority
          className="w-full h-64 object-cover rounded-lg"
          unoptimized={true}
        />
      )}
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-6">
        {post.title}
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        {post.date
          ? new Date(post.date).toLocaleDateString()
          : "Fecha no disponible"}
      </p>
      <div
        className="mt-4 text-gray-600 dark:text-gray-300"
        style={{ textAlign: "justify" }}
      >
        {renderRichText(post.content)}
      </div>
    </article>
  )
}
