import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trayectoria Política | Héctor Valer",
  description:
    "Conoce la trayectoria política y profesional de Héctor Valer, su experiencia en el servicio público y sus logros en el Congreso de la República del Perú.",
  openGraph: {
    title: "Trayectoria Política | Héctor Valer",
    description:
      "Conoce la trayectoria política y profesional de Héctor Valer, su experiencia en el servicio público y sus logros en el Congreso de la República del Perú.",
    images: [{ url: "trayectoria-politica.jpg", width: 1200, height: 630 }],
  },
}

export default function TrayectoriaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

