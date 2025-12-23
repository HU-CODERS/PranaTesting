export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mb-4" />

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-2 mb-6">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              </div>

              <div className="flex gap-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            <div className="h-64 md:h-auto bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="space-y-2">
                  {[1, 2].map((j) => (
                    <div key={j} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
