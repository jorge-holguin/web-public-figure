import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SocialButtons from "./components/SocialButtons"
import { ThemeProvider } from "next-themes"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    default: "Candidato Somos Perú",
    template: "%s | Candidato Somos Perú",
  },
  description: "Sitio web oficial del candidato de Somos Perú",
  icons: [
    {
      rel: "icon",
      type: "image/svg+xml",
      url: "/logo.svg",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/logo.svg",
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <SocialButtons />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

