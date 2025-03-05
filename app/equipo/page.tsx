import PageBanner from "../components/PageBanner"
import Image from "next/image"

export default function Equipo() {
  const despachoPrincipal = [
    { cargo: "Asesor Principal", nombre: "Carlos Mendoza Ramírez", foto: "/images/placeholder-profile.jpg" },
    { cargo: "Asesor II", nombre: "María Elena Torres Vásquez", foto: "/images/placeholder-profile.jpg" },
    { cargo: "Coordinador", nombre: "Jorge Luis Sánchez Prado", foto: "/images/placeholder-profile.jpg" },
    { cargo: "Técnico 1", nombre: "Ana Lucía Paredes Gonzales", foto: "/images/placeholder-profile.jpg" },
    { cargo: "Técnico 2", nombre: "Roberto Díaz Medina", foto: "/images/placeholder-profile.jpg" },
    { cargo: "Auxiliar", nombre: "Patricia Flores Huamán", foto: "/images/placeholder-profile.jpg" },
    { cargo: "Asistente", nombre: "Daniel Quispe Mamani", foto: "/images/placeholder-profile.jpg" },
  ]

  const comisionSeguimiento = [
    { cargo: "Presidente de Comisión", nombre: "Héctor Valer Pinto", foto: "/images/placeholder-profile.jpg" },
    { cargo: "Secretario Técnico", nombre: "Fernando Castillo Mendoza", foto: "/images/placeholder-profile.jpg" },
    { cargo: "Asesor Legal", nombre: "Claudia Ramírez Ortega", foto: "/images/placeholder-profile.jpg" },
    {
      cargo: "Especialista en Políticas Públicas",
      nombre: "Miguel Ángel Rojas Peralta",
      foto: "/images/placeholder-profile.jpg",
    },
    { cargo: "Asistente Administrativo", nombre: "Laura Benites Castro", foto: "/images/placeholder-profile.jpg" },
  ]

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
       <PageBanner
        title="Nuestro Equipo"
        imageSrc="/equipo-valer.jpg"
        imageAlt="Banner de nuestro equipo"
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        {/* Despacho Principal */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-300 dark:border-gray-700">
            Despacho Principal
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {despachoPrincipal.map((miembro, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center"
              >
                <div className="w-32 h-32 mb-4 rounded-full overflow-hidden">
                  <Image
                    src={miembro.foto || "/placeholder.svg"}
                    alt={miembro.nombre}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-lg font-semibold text-somos-blue dark:text-white mb-2 text-center">
                  {miembro.cargo}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-center">{miembro.nombre}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comisión de Seguimiento */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-300 dark:border-gray-700">
            Comisión de Seguimiento
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {comisionSeguimiento.map((miembro, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center"
              >
                <div className="w-32 h-32 mb-4 rounded-full overflow-hidden">
                  <Image
                    src={miembro.foto || "/placeholder.svg"}
                    alt={miembro.nombre}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-lg font-semibold text-somos-red dark:text-white mb-2 text-center">
                  {miembro.cargo}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-center">{miembro.nombre}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

