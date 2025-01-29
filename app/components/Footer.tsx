import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-somos-blue text-white py-8 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Somos Perú</h2>
            <p className="text-sm">Trabajando juntos por un Perú mejor.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
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
          <div className="w-full md:w-1/3">
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
        <div className="mt-8 border-t border-gray-700 pt-8 text-sm text-center">
          © {new Date().getFullYear()} Candidato Somos Perú. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

