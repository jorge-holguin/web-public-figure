import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto",
  description: "Ponte en contacto con nosotros. Estamos aquí para escucharte y responder a tus inquietudes.",
  openGraph: {
    title: "Contacto | Héctor Valer",
    description: "Ponte en contacto con nosotros. Estamos aquí para escucharte y responder a tus inquietudes.",
    images: [
      {
        url: "/contacto.jpg",
        width: 1200,
        height: 630,
        alt: "Contacto Héctor Valer",
      },
    ],
  },
}

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

