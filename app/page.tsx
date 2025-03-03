import Image from "next/image";
import Link from "next/link";
import logo from "../assets/hector_portada.jpeg";

export const revalidate = 1800;

// 1) Generar metadatos dinámicos para la Home
export async function generateMetadata() {
  return {
    title: "Página Oficial de Héctor Valer | Juntos por un Perú Mejor",
    description: "Bienvenido a la página oficial de Héctor Valer. Trabajamos incansablemente para construir un futuro próspero y justo para todos los peruanos.",
    openGraph: {
      title: "Página Oficial de Héctor Valer | Juntos por un Perú Mejor",
      description: "Bienvenido a la página oficial de Héctor Valer. Trabajamos incansablemente para construir un futuro próspero y justo para todos los peruanos.",
      images: ["portada.jpeg"],
      url: "https://hectorvaler.com", 
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Página Oficial de Héctor Valer | Juntos por un Perú Mejor",
      description: "Bienvenido a la página oficial de Héctor Valer. Trabajamos incansablemente para construir un futuro próspero y justo para todos los peruanos.",
      images: ["portada.jpeg"],
    },
  };
}

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Juntos por un</span>
            <span className="block text-red-600">Perú mejor</span>
          </h1>
          <p className="mt-3 text-base text-black-900 dark:text-gray-300 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
            Trabajando incansablemente para construir un futuro próspero y justo para todos los peruanos.
          </p>
          <div className="mt-8 sm:mt-10">
            <Link
              href="/biografia"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-red-600 transition-colors duration-200"
            >
              Conóceme más
            </Link>
          </div>
        </div>
        <div className="mt-10 lg:mt-0">
          <Image
            src={logo}
            alt="Héctor Valer - Somos Perú"
            width={600}
            height={400}
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
