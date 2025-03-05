import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nuestro Equipo | Héctor Valer",
  description:
    "Conoce al equipo de profesionales que trabaja junto a Héctor Valer en el Congreso de la República del Perú, comprometidos con el desarrollo del país.",
  openGraph: {
    title: "Nuestro Equipo | Héctor Valer",
    description:
      "Conoce al equipo de profesionales que trabaja junto a Héctor Valer en el Congreso de la República del Perú, comprometidos con el desarrollo del país.",
    images: [{ url: "/equipo-valer.jpg", width: 1200, height: 630 }],
  },
}

export default function EquipoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

