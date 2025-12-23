import { Skeleton } from "@/components/ui/skeleton"

export default function PagosLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>

      {/* Filtros y búsqueda */}
      <Skeleton className="h-20 w-full rounded-lg mb-6" />

      {/* Tabla de pagos */}
      <Skeleton className="h-96 w-full rounded-lg" />
    </div>
  )
}
