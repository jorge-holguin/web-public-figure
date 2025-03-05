"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Clock, FolderOpen, FileText } from "lucide-react";
import PageBanner from "../components/PageBanner"

interface Ley {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  estado: string;
  url: string | null;
}

export default function LeyesAprobadas() {
  const [leyes, setLeyes] = useState<Ley[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string>("PUBLICADO"); // 🔥 Mostrar solo "PUBLICADO" por defecto
  const [filtroAnio, setFiltroAnio] = useState<string>(""); // Filtro de año vacío por defecto

  useEffect(() => {
    fetch("/api/leyes")
      .then((res) => res.json())
      .then((data) => {
        console.log("📌 Datos de leyes desde Notion:", data);
        setLeyes(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("🚨 Error obteniendo leyes:", error));
  }, []);

  // Filtrar leyes basado en estado y año seleccionado
  const leyesFiltradas = leyes.filter((ley) => {
    const cumpleEstado = filtroEstado ? ley.estado === filtroEstado : true;
    const anio = ley.fecha.split("-")[0]; // Obtener el año de la fecha
    const cumpleAnio = filtroAnio ? anio === filtroAnio : true;
    return cumpleEstado && cumpleAnio;
  });

  // Obtener años únicos disponibles para el filtro
  const aniosDisponibles = Array.from(new Set(leyes.map((ley) => ley.fecha.split("-")[0])))
    .filter((a) => a) // Removemos valores vacíos
    .sort((a, b) => parseInt(b) - parseInt(a)); // Orden descendente

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <PageBanner
        title="Proyectos de Ley"
        imageSrc="/leyes-aprobadas-valer.jpg"
        imageAlt="Banner de leyes aprobadas"
      />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            className="p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="PUBLICADO">Publicados</option>
            <option value="EN COMISION">En Comisión</option>
            <option value="">Todos los estados</option>
          </select>

          <select
            className="p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={filtroAnio}
            onChange={(e) => setFiltroAnio(e.target.value)}
          >
            <option value="">Todos los años</option>
            {aniosDisponibles.map((anio) => (
              <option key={anio} value={anio}>
                {anio}
              </option>
            ))}
          </select>
        </div>

        {/* Lista de leyes filtradas */}
        <div className="space-y-8">
          {leyesFiltradas.length > 0 ? (
            leyesFiltradas.map((ley) => (
              <div
                key={ley.id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex items-start justify-between"
              >
                <div className="flex items-start">
                  {/* Icono dependiendo del estado */}
                  <div className="flex-shrink-0">
                    {ley.estado === "PUBLICADO" ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : ley.estado === "EN COMISION" ? (
                      <FolderOpen className="h-6 w-6 text-blue-500" />
                    ) : (
                      <Clock className="h-6 w-6 text-yellow-500" />
                    )}
                  </div>

                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{ley.titulo}</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{ley.descripcion}</p>

                    {/* Mostrar fecha de actualización con la lógica corregida */}
                    <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
                      {ley.estado === "PUBLICADO"
                        ? `Presentada el ${ley.fecha}`
                        : ley.estado === "EN COMISION"
                        ? `En Comisión desde el ${ley.fecha}`
                        : `Última actualización: ${ley.fecha}`}
                    </p>
                  </div>
                </div>

                {/* Icono de documento, si la ley tiene URL */}
                {ley.url && (
                  <a
                    href={ley.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto flex items-center"
                    title="Ver documento"
                  >
                    <FileText className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors" />
                  </a>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No se encontraron proyectos de ley.</p>
          )}
        </div>
      </div>
    </div>
  );
}
