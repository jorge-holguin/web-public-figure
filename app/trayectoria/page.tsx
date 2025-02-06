import React from "react";

export default function Trayectoria() {
  const trayectoria = [
    {
      año: "2021-2026",
      cargo: "Congresista de la República",
      descripcion:
        "Electo para el periodo 2021-2026, participó en la creación y debate de leyes en beneficio del sector rural y derechos humanos.",
    },
    {
      año: "2022",
      cargo: "Presidente del Consejo de Ministros",
      descripcion:
        "Ejerció como Presidente del Consejo de Ministros del Perú, coordinando las políticas gubernamentales y liderando el gabinete ministerial.",
    },
    {
      año: "2012-2021",
      cargo: "Director General en Centro Jurídico Valer & Abogados S.A.C.",
      descripcion:
        "Dirigió y administró el estudio jurídico, brindando asesoría legal en diversas áreas del derecho.",
    },
    {
      año: "2006",
      cargo: "Gerente en Banco Agropecuario e INDEPA",
      descripcion:
        "Lideró iniciativas para fortalecer el acceso financiero a comunidades campesinas y nativas.",
    },
    {
      año: "1998-2004",
      cargo: "Presidente de la ONG Asociación Solidaridad Española",
      descripcion:
        "Trabajó en programas de apoyo a inmigrantes latinos en España.",
    },
    {
      año: "1993-1997",
      cargo: "Consultor en Colombia",
      descripcion:
        "Se desempeñó como consultor del Instituto Interamericano de Cooperación para la Agricultura (IICA) de la OEA y jefe de programas del PNUD y BID.",
    },
    {
      año: "1985-1990",
      cargo: "Asesor en el Senado de la República",
      descripcion:
        "Colaboró con el senador Ramiro Prialé en políticas públicas para comunidades campesinas.",
    },
  ];
  
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto py-12 px-6 sm:px-8 lg:py-16 lg:px-10">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl text-center">
          Trayectoria Política
        </h1>
        <div className="mt-10 space-y-6">
          {trayectoria.map((item, index) => (
            <div
              key={index}
              className="border-l-4 border-blue-600 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {item.año}: {item.cargo}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {item.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
