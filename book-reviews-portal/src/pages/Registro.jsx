import RegistroForm from "../components/RegistroForm"

export default function Registro() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl">Registrar nueva reseña</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-zinc-600 dark:text-zinc-400 sm:mt-4">
            Comparte tu opinión sobre un libro y ayuda a otros lectores a descubrir nuevas historias
          </p>
        </div>
        <RegistroForm />
      </div>
    </div>
  )
}
