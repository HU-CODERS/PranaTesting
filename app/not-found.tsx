export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-[#305891] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Página no encontrada</h2>
        <p className="text-gray-600 mb-8">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
        <a
          href="/"
          className="inline-block bg-[#305891] text-white px-6 py-3 rounded-md font-medium hover:bg-[#4070b0] transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  )
}
