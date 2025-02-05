import React from "react";
import Image from "next/image";
import educacion_basica from "../../assets/fotos/educacion_basica.png";
import servicio_militar from "../../assets/fotos/servicio_militar.jpg";
import estudios_superiores from "../../assets/fotos/estudios_superiores.jpg";
import experiencia_laboral from "../../assets/fotos/experiencia_laboral.jpg";
import valer_colombia from "../../assets/fotos/valer_colombia.jpg";
import valer_colombia_conferencia from "../../assets/fotos/valer_colombia_conferencia.png";
import valer_bus from "../../assets/fotos/valer_bus.png"; 
import valer_paris from "../../assets/fotos/valer_paris.jpg";
import valer_agropecuario from "../../assets/fotos/valer_agropecuario.jpg";
import valer_naciones_unidas from "../../assets/fotos/valer_naciones_unidas.jpg";
import valer_BID from "../../assets/fotos/valer_BID.jpg";
import valer_evo from "../../assets/fotos/valer_evo.jpg";
import valer_retorno_peru from "../../assets/fotos/valer_retorno_peru.png"; 

export default function Biografia() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          Biografía de Héctor Valer Pinto
        </h1>

        <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
          El congresista de la República <strong>Héctor Valer Pinto</strong> cuenta con una formación multidisciplinaria en varios países. Es doctor en Derecho, con especialidad en Derecho Penal y Desarrollo Rural, y posee amplia experiencia en el sector público y en organizaciones internacionales vinculadas a los derechos humanos.
        </p>

        <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">
          Ha desempeñado cargos como <strong>exviceministro de Comunidades Campesinas</strong> a los 29 años de edad, exfuncionario del IICA – OEA y exfuncionario de la ONU.
        </p>

        <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">
          Líder social de larga trayectoria en la Alianza Popular Revolucionaria Americana, de la línea de Víctor Raúl Haya de la Torre y sus fundadores, posición desde la cual difunde los valores del <strong>social liberalismo</strong>.
        </p>

        <div className="mt-8 space-y-12">
          {/* Sección Educación Básica */}
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">1. Educación Básica</h2>

          <div className="flex flex-col lg:flex-row items-center gap-6 lg:items-start">
            <Image src={educacion_basica} alt="Educación Básica" className="w-48 rounded-lg shadow-md" />
            <div className="flex-1">
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">
                Estudió la primaria en la Escuela Fiscal 665, en el distrito de Cachora; y la secundaria en la Gran Unidad Escolar Miguel Grau, en la provincia de Abancay, del departamento de Apurímac.
              </p>
            </div>
          </div>

          {/* Sección Servicio Militar */}
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">2. Servicio Militar</h2>

          <div className="flex flex-col lg:flex-row-reverse items-center gap-6 lg:items-start">
            <Image src={servicio_militar} alt="Servicio Militar" className="w-48 rounded-lg shadow-md" />
            <div className="flex-1">
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">
                A los 17 años, su espíritu de servicio a la patria lo llevó a unirse al Servicio Militar. Posteriormente, ingresó a la Escuela Técnica del Ejército, donde fue presidente de su promoción.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">3. Estudios Superiores</h2>
          {/* Sección Estudios Superiores */}
          <div className="flex flex-col lg:flex-row items-start gap-6">
            <Image src={estudios_superiores} alt="Estudios Superiores" className="w-72 rounded-lg shadow-md" />
            <div>
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">
                En el Perú, inició sus estudios universitarios en 1981 en la Facultad de Sociología. Posteriormente, convalidó sus estudios y se trasladó a la Facultad de Derecho y Ciencias Políticas, obteniendo el grado de Bachiller en la Universidad Inca Garcilaso de la Vega, cuando era licenciada. En dicha casa de estudios, perteneció al quinto superior y llegó a ser dirigente estudiantil universitario en todos sus estamentos.

              </p>
              
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row-reverse items-start gap-6">
          <Image src={valer_colombia} alt="Estudios Superiores" className="w-72 rounded-lg shadow-md" />
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">
                Luego del golpe civil-militar de Alberto Fujimori Fujimori en 1992, se mantuvo en la clandestinidad al ser dirigente nacional de las comunidades campesinas y nativas del Perú. Después del asesinato del secretario general de la CGTP, Pedro Huilca Tecse, fue buscado vivo o muerto por Vladimiro Montesinos, por lo que en 1993 partió al exilio por vía terrestre con el nombre de Gerardo Rodríguez Pinto (hazaña que será comentada en otro momento).
              </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-6">
              <Image src={valer_colombia_conferencia} alt="Estudios Superiores" className="w-72 rounded-lg shadow-md" />
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">
                Estando como refugiado político en Colombia, durante los años de 1993 a 1997, continuó con sus estudios de Derecho en la Universidad Nacional Libre, obteniendo el título de Abogado (título que, al regresar al Perú, fue convalidado por la UNMSM). Además, realizó una Maestría en Desarrollo Rural, en la Facultad de Economía, en la Pontificia Universidad Javeriana, que culminó en 1995. Ese mismo año, realizó una Especialización en Relaciones Internacionales en la Universidad Privada Jorge Tadeo Lozano, en la ciudad de Bogotá.
              </p>
          </div>

          <div className="flex flex-col lg:flex-row-reverse items-start gap-6">
              <Image src={valer_bus} alt="Estudios Superiores" className="w-72 rounded-lg shadow-md" />
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">
                En 1997, frente a un peligro de asesinato por un comando operativo enviado desde el Perú, la Cruz Roja Internacional trasladó su refugio político a la República de Francia, donde estudió un Diplomado de Estudios de América Latina en la Universidad Sorbonne IV de París.
              </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-6">
              <Image src={valer_paris} alt="Estudios Superiores" className="w-72 rounded-lg shadow-md" />
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">
                A continuación, hasta el año 2000, realizó un Doctorado en Derecho y Relaciones Internacionales en la Universidad Nacional del País Vasco, en España.
                En el año 2013, después de su regreso al Perú, estudió una Maestría en Derecho Penal en la Universidad Nacional Mayor de San Marcos.
              </p>
          </div>

          {/* Sección Experiencia Laboral */}
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">4. Experiencia Laboral</h2>

          <div className="flex flex-col lg:flex-row items-start gap-6">
          <Image src={experiencia_laboral} alt="Estudios Superiores" className="w-72 rounded-lg shadow-md" />
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">
              En el Perú, entre los años 1985 y 1990, trabajó en el Senado de la República con el senador Ramiro Prialé. Posteriormente, ocupó el cargo de Presidente Ejecutivo del Instituto de Comunidades Campesinas y Nativas, puesto con rango viceministerial en el sector Presidencia del Consejo de Ministros.
              </p>
          </div>

          <div className="flex flex-col lg:flex-row-reverse items-start gap-6">
          <Image src={valer_agropecuario} alt="Estudios Superiores" className="w-72 rounded-lg shadow-md" />
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">
              Cabe resaltar que en Colombia entre los años de 1993 a 1996 se desempeñó como consultor del Instituto Interamericano de Desarrollo Agropecuario, IICA, de la Organización de Estados Americanos, OEA.
              </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-6">
              <Image src={valer_naciones_unidas} alt="Estudios Superiores" className="w-72 rounded-lg shadow-md" />
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">
                Y como jefe del Programa de Transferencia de los Distritos de Riego, ejecutado por el Programa de Desarrollo de las Naciones Unidas (PNUD), y luego jefe del Programa del Sistema Nacional de Cofinanciamiento, impulsado por el Banco Interamericano de Desarrollo (BID).  
              </p>
          </div>

          <div className="flex flex-col lg:flex-row-reverse items-start gap-6">
              <Image src={valer_BID} alt="Estudios Superiores" className="w-72 rounded-lg shadow-md" />
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">
                Asimismo, estando en Colombia, fue diputado regional ambiental en la Corporación Regional Ambiental de la región de Tolima.
                En España, durante los años de 1998 al 2004, se desempeñó como presidente de la ONG Asociación Solidaridad Española en el Programa de Solidaridad Social con los inmigrantes latinos con sede en la Comunidad Autónoma de La Rioja. Además, fue Presidente del Consejo Internacional de Derechos Humanos para América Latina ONG Andes-France con sede en San Sebastián, País Vasco.
              </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-6">
              <Image src={valer_evo} alt="Estudios Superiores" className="w-72 rounded-lg shadow-md" />
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">
              Seguidamente, ocupó el cargo de miembro del Consejo Internacional de Derechos Humanos en la Organización de las Naciones Unidas (ONU), con sede en Ginebra. Posteriormente, continuó desempeñándose como representante de la Comisión de Derechos Humanos del Sector Rural para los países andinos en la ONG CICDA y, en su nombre, en el Consejo Internacional de Derechos Humanos con sede en Ginebra, siendo jefe del Programa de Derechos Humanos para el Sector Rural de los Países Andinos de América Latina.
              </p>
          </div>

          <div className="flex flex-col lg:flex-row-reverse items-start gap-6">
              <Image src={valer_retorno_peru} alt="Estudios Superiores" className="w-72 rounded-lg shadow-md" />
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">
                De retorno al Perú, en 2006, asumió cargos gerenciales en el Banco Agropecuario; y en el Instituto Nacional de Desarrollo de los Pueblos Andinos, Amazónicos y Afroperuanos (INDEPA). Asimismo, se desempeñó como presidente del Instituto de Investigación y Capacitación Agropecuaria (INCAGRO).
              </p>
          </div>

        </div>
      </div>
    </div>
  );
}
