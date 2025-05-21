"use client"

import { useEffect, useState } from "react"
import { getRegistros } from "../services/api"
import BookCard from "../components/BookCard"
import { Link } from "react-router-dom"

export default function Home() {
  const [libros, setLibros] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRegistros().then((res) => {
      const aleatorios = res.data.sort(() => 0.5 - Math.random()).slice(0, 4)
      setLibros(aleatorios)
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen">
      <div className="bg-zinc-900 dark:bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                Descubre y comparte tus <span className="text-zinc-300">experiencias literarias</span>
              </h1>
              <p className="mt-6 text-xl text-zinc-300 max-w-3xl">
                Explora reseñas de libros, comparte tus opiniones y conecta con otros amantes de la lectura en nuestra
                comunidad.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/registro"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-zinc-900 bg-white hover:bg-zinc-100 shadow-sm transition-colors"
                >
                  Publicar reseña
                </Link>
                <Link
                  to="/lista"
                  className="inline-flex items-center justify-center px-6 py-3 border border-zinc-600 text-base font-medium rounded-md text-white hover:bg-zinc-800 transition-colors"
                >
                  Explorar reseñas
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-64 w-64 text-zinc-700 dark:text-zinc-800 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Reseñas recientes</h2>
          <Link
            to="/lista"
            className="text-zinc-900 dark:text-zinc-200 hover:text-zinc-700 dark:hover:text-zinc-50 font-medium flex items-center"
          >
            Ver todas
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zinc-600 dark:border-zinc-300"></div>
          </div>
        ) : libros.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {libros.map((libro, index) => (
              <BookCard key={index} book={libro} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <p className="text-zinc-500 dark:text-zinc-400">No hay reseñas disponibles en este momento.</p>
          </div>
        )}
      </div>

      <div className="bg-zinc-100 dark:bg-zinc-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-900 dark:bg-zinc-800 rounded-lg border border-zinc-800 dark:border-zinc-700 shadow-sm overflow-hidden">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  <span className="block">¿Tienes un libro favorito?</span>
                  <span className="block text-zinc-300">Comparte tu opinión ahora</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-zinc-300">
                  Ayuda a otros lectores a descubrir nuevas historias y comparte tu experiencia literaria.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <div className="rounded-md shadow">
                  <Link
                    to="/registro"
                    className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-zinc-900 bg-white hover:bg-zinc-50 md:py-4 md:text-lg md:px-10"
                  >
                    Publicar reseña
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
