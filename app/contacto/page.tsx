"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PageBanner from "../components/PageBanner"

export default function Contacto() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  interface FormData {
    nombre: string;
    email: string;
    mensaje: string;
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        console.error("Error:", result.error);
      }
    } catch (error) {
      console.error("Error enviando el formulario:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <PageBanner title="Contáctanos" imageSrc="/contacto.jpg" imageAlt="Banner de contacto" />

      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        {submitSuccess ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            ¡Gracias! Tu mensaje ha sido enviado.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Nombre</label>
              <input
                {...register("nombre", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
                placeholder="Tu nombre"
              />
              {errors.nombre && <span className="text-red-500 text-xs">Este campo es obligatorio</span>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Email</label>
              <input
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
                placeholder="tu@email.com"
              />
              {errors.email && <span className="text-red-500 text-xs">Ingresa un email válido</span>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Mensaje</label>
              <textarea
                {...register("mensaje", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
                placeholder="Tu mensaje"
                rows={4}
              ></textarea>
              {errors.mensaje && <span className="text-red-500 text-xs">Este campo es obligatorio</span>}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-somos-blue hover:bg-somos-red text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

