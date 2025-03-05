import type React from "react"
import { getBlogPosts } from "../../lib/notion"
import { transformNotionImageUrl } from "../../lib/utils"
import type { Metadata } from "next"

export const revalidate = 1800 // Revalidación cada 30 minutos

export async function generateMetadata({ params }: { params: { slug?: string } }): Promise<Metadata> {
  // Si no hay slug, es la página principal del blog: retorna metadatos por defecto
  if (!params.slug) {
    return {
      title: "Blog de Noticias | Héctor Valer",
      description:
        "Noticias, actualizaciones y propuestas de Héctor Valer Pinto y Somos Perú para un Perú mejor.",
      openGraph: {
        title: "Blog | Héctor Valer",
        description:
          "Noticias, actualizaciones y propuestas de Héctor Valer Pinto y Somos Perú para un Perú mejor.",
        images: [{ url: "/noticias.jpg", width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title: "Blog | Héctor Valer",
        description:
          "Noticias, actualizaciones y propuestas de Héctor Valer Pinto y Somos Perú para un Perú mejor.",
        images: ["/noticias.jpg"],
      },
    }
  }

  // Si hay slug, buscamos el post específico
  const posts = await getBlogPosts()
  const post = posts.find((p) => p.slug === params.slug)

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

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>
}
