"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error occurred:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-[#305891] mb-4">Error</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Algo salió mal</h2>
        <p className="text-gray-600 mb-8">Lo sentimos, ha ocurrido un error inesperado.</p>
        <button
          onClick={() => {
            try {
              // Verificar si reset es una función antes de llamarla
              if (typeof reset === "function") {
                reset()
              } else {
                // Si no es una función, redirigir a la página principal
                window.location.href = "/"
              }
            } catch (e) {
              console.error("Error al intentar resetear:", e)
              // Fallback: redirigir a la página principal
              window.location.href = "/"
            }
          }}
          className="inline-block bg-[#305891] text-white px-6 py-3 rounded-md font-medium hover:bg-[#4070b0] transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}
