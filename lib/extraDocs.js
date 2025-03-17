// /lib/extraDocs.js

export function getExtraDocuments() {
    // Texto de la biografía
    const biographyText = `
  **Biografía de Héctor Valer:**
  
  El congresista de la República **Héctor Valer Pinto** cuenta con una formación multidisciplinaria en varios países. Es doctor en Derecho, con especialidad en Derecho Penal y Desarrollo Rural, y posee amplia experiencia en el sector público y en organizaciones internacionales vinculadas a los derechos humanos.
  
  Ha desempeñado cargos como **Presidente Ejecutivo del Instituto de Comunidades Campesinas** a los 29 años de edad, exfuncionario del IICA – OEA y exfuncionario de la ONU.
  
  Líder social de larga trayectoria en la Alianza Popular Revolucionaria Americana, de la línea de Víctor Raúl Haya de la Torre y sus fundadores, posición desde la cual difunde los valores del **social liberalismo**.
  
  ---
  ### 1. Educación Básica
  Estudió la primaria en la Escuela Fiscal 665, en el distrito de Cachora; y la secundaria en la Gran Unidad Escolar Miguel Grau, en la provincia de Abancay, del departamento de Apurímac.
  
  ---
  ### 2. Servicio Militar
  A los 17 años, su espíritu de servicio a la patria lo llevó a unirse al Servicio Militar. Posteriormente, ingresó a la Escuela Técnica del Ejército, donde fue presidente de su promoción.
  
  ---
  ### 3. Estudios Superiores
  En el Perú, inició sus estudios universitarios en 1981 en la Facultad de Sociología. Posteriormente, convalidó sus estudios y se trasladó a la Facultad de Derecho y Ciencias Políticas, obteniendo el grado de Bachiller en la Universidad Inca Garcilaso de la Vega. 
  
  Luego del golpe civil-militar de Alberto Fujimori en 1992, se mantuvo en la clandestinidad al ser dirigente nacional de las comunidades campesinas y nativas del Perú. Después del asesinato del secretario general de la CGTP, Pedro Huilca Tecse, fue buscado vivo o muerto por Vladimiro Montesinos, por lo que en 1993 partió al exilio por vía terrestre con el nombre de Gerardo Rodríguez Pinto.
  
  Estando como refugiado político en Colombia (1993-1997), continuó con sus estudios de Derecho en la Universidad Nacional Libre, obteniendo el título de Abogado (luego convalidado en la UNMSM). Además, realizó una Maestría en Desarrollo Rural en la Pontificia Universidad Javeriana (1995), y una Especialización en Relaciones Internacionales en la Universidad Privada Jorge Tadeo Lozano (1995).
  
  En 1997, frente a un peligro de asesinato, la Cruz Roja Internacional trasladó su refugio político a Francia, donde estudió un Diplomado de Estudios de América Latina en la Universidad Sorbonne IV de París. Luego, hasta el año 2000, realizó un Doctorado en Derecho y Relaciones Internacionales en la Universidad Nacional del País Vasco, en España.
  
  En 2013, tras regresar al Perú, estudió una Maestría en Derecho Penal en la Universidad Nacional Mayor de San Marcos.
  
  ---
  ### 4. Experiencia Laboral
  En el Perú, entre 1985 y 1990, trabajó en el Senado de la República con el senador Ramiro Prialé. Posteriormente, ocupó el cargo de Presidente Ejecutivo del Instituto de Comunidades Campesinas y Nativas, con rango viceministerial.
  
  Entre 1993 y 1996, se desempeñó en Colombia como consultor del Instituto Interamericano de Desarrollo Agropecuario (IICA), de la OEA, y como jefe de programas del PNUD y BID. Fue diputado regional ambiental en la Corporación Regional Ambiental de la región de Tolima.
  
  En España (1998-2004), fue presidente de la ONG Asociación Solidaridad Española, apoyando a inmigrantes latinos. También fue Presidente del Consejo Internacional de Derechos Humanos para América Latina ONG Andes-France, con sede en San Sebastián, País Vasco.
  
  Posteriormente, formó parte del Consejo Internacional de Derechos Humanos en la ONU (Ginebra), y fue representante de la Comisión de Derechos Humanos del Sector Rural para países andinos en la ONG CICDA.
  
  De retorno al Perú, en 2006, asumió cargos gerenciales en el Banco Agropecuario y en el Instituto Nacional de Desarrollo de los Pueblos Andinos, Amazónicos y Afroperuanos (INDEPA). Además, se desempeñó como presidente del Instituto de Investigación y Capacitación Agropecuaria (INCAGRO).
    `;
  
    // Texto de la trayectoria
    const trayectoriaText = `
  **Trayectoria Política de Héctor Valer:**
  
  - **2021-2026**: Congresista de la República  
    Electo para el periodo 2021-2026, participó en la creación y debate de leyes en beneficio del sector rural y derechos humanos.
  
  - **2022**: Presidente del Consejo de Ministros  
    Ejerció como Presidente del Consejo de Ministros del Perú, coordinando las políticas gubernamentales y liderando el gabinete ministerial.
  
  - **2012-2021**: Director General en Centro Jurídico Valer & Abogados S.A.C.  
    Dirigió y administró el estudio jurídico, brindando asesoría legal en diversas áreas del derecho.
  
  - **2006**: Gerente en Banco Agropecuario e INDEPA  
    Lideró iniciativas para fortalecer el acceso financiero a comunidades campesinas y nativas.
  
  - **1998-2004**: Presidente de la ONG Asociación Solidaridad Española  
    Trabajó en programas de apoyo a inmigrantes latinos en España.
  
  - **1993-1997**: Consultor en Colombia  
    Se desempeñó como consultor del IICA de la OEA y jefe de programas del PNUD y BID.
  
  - **1985-1990**: Asesor en el Senado de la República  
    Colaboró con el senador Ramiro Prialé en políticas públicas para comunidades campesinas.
    `;
  
    return [
      {
        text: biographyText,
        type: "biografia",
      },
      {
        text: trayectoriaText,
        type: "trayectoria",
      },
    ];
  }
  