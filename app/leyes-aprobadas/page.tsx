import { CheckCircle } from "lucide-react"

const leyesAprobadas = [
  {
    titulo: "Ley 1",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac purus sit amet nisl tincidunt tincidunt.",
    fecha: "15 de marzo de 2022",
  },
  {
    titulo: "Ley 2",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac purus sit amet nisl tincidunt tincidunt.",
    fecha: "22 de abril de 2022",
  },
  {
    titulo: "Ley 3",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    fecha: "10 de junio de 2022",
  },
  {
    titulo: "Ley 4",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    fecha: "5 de septiembre de 2022",
  },
]

export default function LeyesAprobadas() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-8">Leyes Aprobadas</h1>
        <div className="space-y-8">
          {leyesAprobadas.map((ley, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{ley.titulo}</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{ley.descripcion}</p>
                  <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">Aprobada el {ley.fecha}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

