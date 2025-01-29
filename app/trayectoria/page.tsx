export default function Trayectoria() {
  const logros = [
    {
      año: "2018-2022",
      cargo: "Congresista de la República",
      descripcion: "Autor de importantes leyes en materia de educación y salud pública.",
    },
    {
      año: "2015-2018",
      cargo: "Alcalde Distrital",
      descripcion: "Implementación de programas de seguridad ciudadana y mejora de infraestructura urbana.",
    },
    {
      año: "2011-2015",
      cargo: "Regidor Municipal",
      descripcion: "Promoción de políticas de desarrollo sostenible y participación ciudadana.",
    },
    {
      año: "2007-2011",
      cargo: "Asesor Parlamentario",
      descripcion: "Contribución en la elaboración de proyectos de ley en materia de derechos laborales.",
    },
  ]

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Trayectoria Política</h1>
        <div className="mt-8">
          {logros.map((logro, index) => (
            <div key={index} className="mb-8 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {logro.año}: {logro.cargo}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{logro.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

