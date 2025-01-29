import { CheckCircle } from "lucide-react"

const leyesAprobadas = [
  {
    titulo: "Ley de Fortalecimiento de la Educación Pública",
    descripcion:
      "Esta ley busca mejorar la calidad de la educación pública mediante la inversión en infraestructura y capacitación docente.",
    fecha: "15 de marzo de 2022",
  },
  {
    titulo: "Ley de Protección del Medio Ambiente",
    descripcion:
      "Establece medidas para la conservación de áreas naturales y la reducción de la contaminación en zonas urbanas.",
    fecha: "22 de abril de 2022",
  },
  {
    titulo: "Ley de Fomento al Emprendimiento",
    descripcion: "Proporciona incentivos fiscales y facilidades administrativas para la creación de nuevas empresas.",
    fecha: "10 de junio de 2022",
  },
  {
    titulo: "Ley de Transparencia en la Gestión Pública",
    descripcion: "Fortalece los mecanismos de rendición de cuentas y acceso a la información pública.",
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

