import React from "react";

export default function Biografia() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          Biografía de Héctor Valer Pinto
        </h1>

        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Sección de Texto */}
          <div>
            <p className="text-lg text-gray-500 dark:text-gray-300">
              El congresista de la República <strong>Héctor Valer Pinto</strong> cuenta con una formación multidisciplinaria en varios países. 
              Es doctor en Derecho, con especialidad en Derecho Penal y Desarrollo Rural, y posee amplia experiencia en el sector público 
              y en organizaciones internacionales vinculadas a los derechos humanos.
            </p>

            <h2 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">Educación y Formación</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Cursó sus estudios en la <strong>Universidad Inca Garcilaso de la Vega</strong>, obteniendo el grado de Bachiller en Derecho y 
              Ciencias Políticas. Posteriormente, continuó su formación en el extranjero, obteniendo títulos y especializaciones en 
              universidades de Colombia, Francia y España.
            </p>

            <h2 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">Experiencia Profesional</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Ha desempeñado cargos como <strong>exviceministro de Comunidades Campesinas</strong>, exfuncionario del IICA – OEA y 
              exfuncionario de la ONU. En Colombia, trabajó como consultor del Instituto Interamericano de Desarrollo Agropecuario (IICA) y 
              jefe de programas en el Banco Interamericano de Desarrollo (BID).
            </p>

            <h2 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">Trayectoria Política</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Líder social de larga trayectoria en la Alianza Popular Revolucionaria Americana (APRA), promoviendo los valores del 
              <strong>social liberalismo</strong>. Ha trabajado en el Congreso de la República del Perú, impulsando leyes en favor del 
              desarrollo rural y la justicia social.
            </p>

            <h2 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">Compromiso con el Perú</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Desde su regreso al Perú, ha ocupado cargos de liderazgo en entidades como el <strong>Banco Agropecuario</strong> y el 
              <strong>Instituto Nacional de Desarrollo de los Pueblos Andinos, Amazónicos y Afroperuanos (INDEPA)</strong>. Su lucha se 
              centra en mejorar la calidad de vida de los peruanos y fortalecer las instituciones democráticas.
            </p>
          </div>

          {/* Imagen del Candidato */}
          <div className="mt-8 lg:mt-0 flex justify-center">
            <img
              src="/biografia.jpg"
              alt="Héctor Valer Pinto"
              className="rounded-lg shadow-xl w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
