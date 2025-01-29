import Image from "next/image"

export default function Biografia() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Biografía</h1>
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <p className="text-lg text-gray-500 dark:text-gray-300">
              Nacido y criado en Lima, Perú, he dedicado mi vida al servicio público y a la mejora de las condiciones de
              vida de mis conciudadanos. Con una formación en Derecho y Ciencias Políticas, he trabajado incansablemente
              para promover la justicia social y el desarrollo económico en nuestro país.
            </p>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Mi carrera política comenzó hace más de 20 años, cuando fui elegido como regidor municipal. Desde
              entonces, he ocupado diversos cargos públicos, siempre con el objetivo de servir a mi comunidad y
              contribuir al progreso de nuestra nación.
            </p>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Como miembro del partido Somos Perú, estoy comprometido con los valores de democracia, transparencia y
              desarrollo sostenible. Mi visión es la de un Perú unido, próspero y justo, donde cada ciudadano tenga la
              oportunidad de alcanzar su máximo potencial.
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            <Image
              src="/biografia.jpg"
              alt="Biografía del candidato"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

