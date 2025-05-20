export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1440px] py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images Skeleton */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-200" />

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <div>
              <div className="h-8 w-2/3 bg-gray-200 rounded mb-2" />
              <div className="h-6 w-1/3 bg-gray-200 rounded" />
            </div>

            <div className="border-t border-b py-4">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-6 w-24 bg-gray-200 rounded" />
                </div>
                <div className="space-y-2 text-right">
                  <div className="h-4 w-20 bg-gray-200 rounded ml-auto" />
                  <div className="h-6 w-32 bg-gray-200 rounded ml-auto" />
                </div>
              </div>
            </div>

            {/* Product Details Skeleton */}
            <div className="space-y-4">
              <div className="h-6 w-32 bg-gray-200 rounded" />
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                    <div className="h-5 w-16 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Description Skeleton */}
            <div className="space-y-4">
              <div className="h-6 w-24 bg-gray-200 rounded" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
                <div className="h-4 w-4/6 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
