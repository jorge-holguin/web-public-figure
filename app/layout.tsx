import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SocialButtons from "./components/SocialButtons";
import { ThemeProvider } from "next-themes";
//import MotionBackground from "./MotionBackground"; 

const inter = Inter({ subsets: ["latin"] });

// Puedes comentar o eliminar estos metadatos globales para que no sobrescriban los de las páginas.
// export const metadata = {
//   title: "Candidato Somos Perú",
//   description: "Sitio web oficial del candidato de Somos Perú",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} relative min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Monta el componente cliente que contiene la animación de fondo */}
          {/* <MotionBackground /> */}

          <Navbar />
          <main className="flex-grow">{children}</main>
          <SocialButtons />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
