export default function MisReservasLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
      </div>

      {/* Tabs skeleton */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 max-w-md">
        <div className="flex-1 py-2 px-4 rounded-md bg-gray-200 animate-pulse h-8"></div>
        <div className="flex-1 py-2 px-4 rounded-md bg-gray-200 animate-pulse h-8"></div>
        <div className="flex-1 py-2 px-4 rounded-md bg-gray-200 animate-pulse h-8"></div>
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
