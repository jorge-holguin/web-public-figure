import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto | Somos Perú",
  description:
    "Póngase en contacto con el equipo de Héctor Valer Pinto y Somos Perú. Estamos aquí para escuchar sus inquietudes y propuestas.",
  openGraph: {
    title: "Contacto | Somos Perú",
    description:
      "Póngase en contacto con el equipo de Héctor Valer Pinto y Somos Perú. Estamos aquí para escuchar sus inquietudes y propuestas.",
    images: ["/contacto.jpg"],
  },
}

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

