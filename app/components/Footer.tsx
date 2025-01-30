import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo_somos.png";

export default function Footer() {
  return (
    <footer className="bg-somos-blue text-white py-10 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Sección de columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          
          {/* Columna 1: Logo dentro de un círculo blanco */}
          <div className="flex flex-col items-center md:items-center">
            <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Link href="/">
                <Image className="w-28 h-auto" src={logo} alt="Logo Somos Perú" />
              </Link>
            </div>
            <p className="text-lg font-semibold mt-3">Trabajando juntos por un Perú mejor.</p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/biografia" className="hover:underline">
                  Biografía
                </Link>
              </li>
              <li>
                <Link href="/trayectoria" className="hover:underline">
                  Trayectoria
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:underline">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p className="text-sm">
              Lima, Perú
              <br />
              Email: contacto@somosperu.pe
              <br />
              Teléfono: +51 1 234 5678
            </p>
          </div>
        </div>

        {/* Línea divisoria y derechos reservados */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-sm text-center">
          © {new Date().getFullYear()} Héctor Valer. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
