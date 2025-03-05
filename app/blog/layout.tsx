import type React from "react"
import type { Metadata } from "next"

export const revalidate = 1800 // Revalidación cada 30 minutos

// Metadata estática para la página principal del blog
export const metadata: Metadata = {
  title: "Blog de Noticias | Héctor Valer",
  description: "Noticias, actualizaciones y propuestas de Héctor Valer Pinto y Somos Perú para un Perú mejor.",
  openGraph: {
    title: "Blog | Héctor Valer",
    description: "Noticias, actualizaciones y propuestas de Héctor Valer Pinto y Somos Perú para un Perú mejor.",
    images: [{ url: "/noticias.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Héctor Valer",
    description: "Noticias, actualizaciones y propuestas de Héctor Valer Pinto y Somos Perú para un Perú mejor.",
    images: ["/noticias.jpg"],
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>
}
