"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProfesorError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error en sección de profesor:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-[#305891] mb-4">Error</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Algo salió mal en esta página</h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, ha ocurrido un error inesperado mientras cargábamos esta sección.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              try {
                if (typeof reset === "function") {
                  reset()
                } else {
                  router.refresh()
                }
              } catch (e) {
                console.error("Error al intentar resetear:", e)
                router.refresh()
              }
            }}
            className="inline-block bg-[#305891] text-white px-6 py-3 rounded-md font-medium hover:bg-[#4070b0] transition-colors"
          >
            Intentar de nuevo
          </button>
          <button
            onClick={() => router.push("/profesor/dashboard")}
            className="inline-block bg-white border border-[#305891] text-[#305891] px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            Volver al dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
