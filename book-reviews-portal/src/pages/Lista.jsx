"use client"

import { useEffect, useState } from "react"
import { getRegistros, getRegistrosPorCategoria } from "../services/api"
import BookCard from "../components/BookCard"

export default function Lista() {
  const [registros, setRegistros] = useState([])
  const [categoria, setCategoria] = useState("")
  const [todas, setTodas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRegistros().then((res) => {
      setRegistros(res.data)
      const categoriasUnicas = [...new Set(res.data.map((r) => r.categoria))]
      setTodas(categoriasUnicas)
      setLoading(false)
    })
  }, [])

  const filtrar = async () => {
    setLoading(true)
    try {
      if (!categoria) {
        const res = await getRegistros()
        setRegistros(res.data)
      } else {
        const res = await getRegistrosPorCategoria(categoria)
        setRegistros(res.data)
      }
    } catch (error) {
      console.error("Error al filtrar:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl">Explora las reseñas</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-zinc-600 dark:text-zinc-400 sm:mt-4">
            Descubre opiniones sobre libros de diferentes categorías
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4">
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all outline-none appearance-none"
            >
              <option value="">Todas las categorías</option>
              {todas.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              onClick={filtrar}
              className="w-full sm:w-auto bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-6 py-2 rounded-md font-medium transition-colors flex items-center justify-center hover:bg-zinc-800 dark:hover:bg-zinc-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filtrar
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zinc-600 dark:border-zinc-300"></div>
          </div>
        ) : registros.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {registros.map((item, index) => (
              <BookCard key={index} book={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-zinc-300 dark:text-zinc-600 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">No se encontraron reseñas</h3>
            <p className="mt-1 text-zinc-500 dark:text-zinc-400">
              Intenta con otra categoría o agrega una nueva reseña.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
