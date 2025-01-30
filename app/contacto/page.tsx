"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

export default function Contacto() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  interface FormData {
    nombre: string
    email: string
    mensaje: string
  }

  const onSubmit = async (data: FormData): Promise<void> => {
    console.log("Formulario enviado con los siguientes datos:", data) // 👀 Agregado para depuración
    setIsSubmitting(true)
    // Aquí típicamente enviarías los datos a tu API
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulación de llamada a API
    setIsSubmitting(false)
    setSubmitSuccess(true)
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-8">Contáctanos</h1>
        {submitSuccess ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">¡Gracias por tu mensaje!</strong>
            <span className="block sm:inline"> Nos pondremos en contacto contigo pronto.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="nombre">
                Nombre
              </label>
              <input
                {...register("nombre", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                placeholder="Tu nombre"
              />
              {errors.nombre && <span className="text-red-500 text-xs italic">Este campo es requerido</span>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="tu@email.com"
              />
              {errors.email && <span className="text-red-500 text-xs italic">Por favor, ingresa un email válido</span>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="mensaje">
                Mensaje
              </label>
              <textarea
                {...register("mensaje", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="mensaje"
                placeholder="Tu mensaje"
                rows={4}
              ></textarea>
              {errors.mensaje && <span className="text-red-500 text-xs italic">Este campo es requerido</span>}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-somos-blue hover:bg-somos-red text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                type="submit"
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
