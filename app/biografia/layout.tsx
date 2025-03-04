import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Biografía de Héctor Valer Pinto | Somos Perú",
  description:
    "Conozca la trayectoria y experiencia de Héctor Valer Pinto, líder de Somos Perú y defensor de los derechos de los peruanos.",
  openGraph: {
    title: "Biografía de Héctor Valer Pinto | Somos Perú",
    description:
      "Conozca la trayectoria y experiencia de Héctor Valer Pinto, líder de Somos Perú y defensor de los derechos de los peruanos.",
    images: ["/biografia.png"],
  },
}

export default function BiografiaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
