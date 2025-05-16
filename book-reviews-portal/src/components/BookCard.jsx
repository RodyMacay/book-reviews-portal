export default function BookCard({ book }) {
  return (
    <div className="bg-white dark:bg-zinc-950 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-56 overflow-hidden">
        {book.imagen ? (
          <img
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            src={book.imagen || "/placeholder.svg"}
            alt={book.titulo}
          />
        ) : (
          <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-zinc-300 dark:text-zinc-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
            {book.categoria}
          </span>
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1 line-clamp-1">{book.titulo}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-3">{book.autor}</p>
        <p className="text-zinc-600 dark:text-zinc-300 text-sm line-clamp-3 mb-3 flex-grow">{book.reseña || book.resena}</p>

      </div>
    </div>
  )
}
