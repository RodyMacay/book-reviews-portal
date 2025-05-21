"use client"

import { useState } from "react"
import { createRegistro } from "../services/api"
import { storage, ref, uploadBytes, getDownloadURL } from "../services/firebaseConfig"

export default function RegistroForm() {
  const [form, setForm] = useState({ titulo: "", autor: "", resena: "", categoria: "", puntuacion: 1, tituloLibro: "" })
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    if (selectedFile) {
      setFileName(selectedFile.name)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!form.titulo || !form.autor || !form.resena || !form.categoria || !form.puntuacion || !form.tituloLibro) {
      setError("Todos los campos son obligatorios")
      setLoading(false)
      return
    }

    try {
      let imageUrl = ""

      if (file) {
        const storageRef = ref(storage, `imagenes/${Date.now()}_${file.name}`)
        await uploadBytes(storageRef, file)
        imageUrl = await getDownloadURL(storageRef)
      }

      const finalForm = {
        tituloReseña: form.titulo, 
        autor: form.autor,
        resena: form.resena,
        categoria: form.categoria,
        puntuacion: Number(form.puntuacion), 
        tituloLibro: form.tituloLibro,
        imagen: imageUrl
      }

      await createRegistro(finalForm)
      setSuccess(true)
      setForm({ titulo: "", autor: "", resena: "", categoria: "", puntuacion: 1, tituloLibro: "" })
      setFile(null)
      setFileName("")
      setError("")
    } catch (err) {
      console.error(err)
      setError("Error al enviar el registro")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 max-w- mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && (
          <div className="bg-red-50 dark:bg-red-950/50 border-l-4 border-red-500 p-4 rounded-md">
            <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 dark:bg-green-950/50 border-l-4 border-green-500 p-4 rounded-md">
            <p className="text-green-600 dark:text-green-400 font-medium">
              ¡Registro exitoso! Tu reseña ha sido publicada.
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="titulo" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Título de la reseña
            </label>
            <input
              id="titulo"
              className="w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all outline-none"
              name="titulo"
              placeholder="Ej: Mi reseña sobre..."
              value={form.titulo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="tituloLibro" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Título del libro
            </label>
            <input
              id="tituloLibro"
              className="w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all outline-none"
              name="tituloLibro"
              placeholder="Ej: Cien años de soledad"
              value={form.tituloLibro}
              onChange={handleChange}
              required
            />
          </div>
        </div>


        <div className="space-y-2">
          <label htmlFor="autor" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Autor
          </label>
          <input
            id="autor"
            className="w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all outline-none"
            name="autor"
            placeholder="Ej: Gabriel García Márquez"
            value={form.autor}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="resena" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Reseña
          </label>
          <textarea
            id="resena"
            className="w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md h-32 focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all outline-none resize-none"
            name="resena"
            placeholder="Comparte tu opinión sobre este libro..."
            value={form.resena}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

          <div className="space-y-2">
            <label htmlFor="categoria" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Categoría
            </label>
            <select
              id="categoria"
              className="w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all outline-none appearance-none"
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Selecciona una categoría
              </option>
              <option value="Ficción">Ficción</option>
              <option value="No ficción">No ficción</option>
              <option value="Fantasía">Fantasía</option>
              <option value="Ciencia ficción">Ciencia ficción</option>
              <option value="Romance">Romance</option>
              <option value="Misterio">Misterio</option>
              <option value="Biografía">Biografía</option>
              <option value="Historia">Historia</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="puntuacion" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Puntuación
            </label>
            <select
              id="puntuacion"
              className="w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all outline-none appearance-none"
              name="puntuacion"
              value={form.puntuacion}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5].map((p) => (
                <option key={p} value={p}>
                  {p} estrellas
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="imagen" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Imagen de portada
          </label>
          <div className="relative">
            <input id="imagen" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <label
              htmlFor="imagen"
              className="flex items-center justify-center w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 border-dashed rounded-md cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex flex-col items-center space-y-2 py-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-zinc-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {fileName ? fileName : "Seleccionar imagen de portada"}
                </span>
              </div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 py-2.5 px-6 rounded-md font-medium shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50 transition-all ${loading ? "opacity-50" : ""
            }`}
        >
          {loading ? "Cargando..." : "Enviar reseña"}
        </button>
      </form>
    </div>
  )
}
