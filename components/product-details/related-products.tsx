"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "@/app/api/product"
import Image from "next/image"
import Link from "next/link"

interface RelatedProductsProps {
  currentProductId: string
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["relatedProducts", currentProductId],
    queryFn: async () => {
      // Fetch products with a limit, excluding current product on client side
      const result = await fetchProducts({ limit: 4 })
      return result.products.filter((p) => p.id !== currentProductId).slice(0, 3)
    },
  })
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  if (isLoading) {
    return (
      <div className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return null
  }

  return (
    <div className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.image ? `${baseUrl}${product.image}` : "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "https://placehold.co/400x400/e5e5e5/666?text=No+Image"
                    }}
                  />
                </div>
                {product.badge && (
                  <div
                    className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded ${
                      product.badge.color === "red" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}
                  >
                    {product.badge.text}
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                <p className="text-xs text-gray-600 mb-3">{product.type}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">${product.price}</span>
                  <span className="text-xs text-gray-500">
                    {product.colors} {product.colors === 1 ? "Colour" : "Colours"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}