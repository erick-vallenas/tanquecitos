export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="skeleton h-6 w-40 mb-6" />
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <div className="skeleton h-5 w-24" />
            <div className="skeleton h-10 w-full" />
            <div className="skeleton h-5 w-24" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton h-4 w-3/4" />
            ))}
          </div>
        </aside>
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="skeleton aspect-square" />
                <div className="p-4 space-y-2">
                  <div className="skeleton h-4 w-3/4" />
                  <div className="skeleton h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
