import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Leyes Aprobadas | Héctor Valer",
  description:
    "Descubre las leyes aprobadas y propuestas legislativas impulsadas por Héctor Valer en el Congreso de la República del Perú.",
  openGraph: {
    title: "Leyes Aprobadas | Héctor Valer",
    description:
      "Descubre las leyes aprobadas y propuestas legislativas impulsadas por Héctor Valer en el Congreso de la República del Perú.",
    images: [{ url: "/leyes-aprobadas-valer.jpg", width: 1200, height: 630 }],
  },
}

export default function LeyesAprobadasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

