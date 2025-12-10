"use client"

import React, { useCallback, useState, memo } from "react"
import { Heart } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { fetchProducts, ProductFilters } from "@/app/api/product"
import Link from "next/link"


const getBadgeColor = (color: string) => {
  switch (color) {
    case "red":
      return "text-red-600"
    case "green":
      return "text-green-600"
    case "blue":
      return "text-blue-600"
    default:
      return "text-gray-600"
  }
}

interface Product {
  id: string
  name: string
  type: string
  price: number
  colors: number
  image: string
  badge?: {
    text: string
    color: "red" | "green" | "blue"
  }
}

interface ProductGridProps {
  filters: ProductFilters
}

// Memoized card to avoid re-rendering all images when favorites change
const ProductCard = memo(function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}: {
  product: Product
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}) {
  // local image src state to handle onError fallback without affecting parent
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const [imageSrc, setImageSrc] = useState(product.image ? `${baseUrl}${product.image}` : "/placeholder.svg")

  return (
    <Link key={product.id} className="group" href={`/products/${product.id}`}>
      <div className="relative mb-4 bg-muted rounded-lg overflow-hidden aspect-square">
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          onError={() => {
            // replace failing image with placeholder to avoid repeated 404s
            if (imageSrc !== "/placeholder.svg") setImageSrc("/placeholder.svg")
          }}
          unoptimized={false} // keep default optimization; fallback will avoid repeated 404s
        />

        <button
          onClick={(e) => {
            // Prevent Link navigation when toggling favorite
            e.preventDefault()
            e.stopPropagation()
            onToggleFavorite(product.id)
          }}
          title="favorite button"
          className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow hover:shadow-lg transition-shadow"
        >
          <Heart
            size={20}
            className={isFavorite ? "fill-red-500 text-red-500" : "text-foreground"}
          />
        </button>

        {product.badge && (
          <div className="absolute top-4 left-4 border border-border rounded-full px-3 pb-1 bg-white">
            <span className={`text-xs font-semibold ${getBadgeColor(product.badge.color)}`}>
              {product.badge.text}
            </span>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm mb-1 text-foreground">{product.name}</h3>
          <span className="font-semibold text-md">${product.price}</span>
        </div>

        <p className="text-xs text-muted-foreground mb-2">{product.type}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {product.colors} Colour{product.colors !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </Link>
  )
},
// custom comparator: only re-render if relevant product fields or favorite status changed
(prev, next) =>
  prev.isFavorite === next.isFavorite &&
  prev.product.id === next.product.id &&
  prev.product.image === next.product.image &&
  prev.product.price === next.product.price &&
  prev.product.name === next.product.name &&
  prev.product.type === next.product.type &&
  ((prev.product.badge && next.product.badge && prev.product.badge.text === next.product.badge.text) ||
    (!prev.product.badge && !next.product.badge))
)

export default function ProductGrid({ filters }: ProductGridProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
  })

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  if (isLoading) {
    return <div className="text-center py-12">Loading products...</div>
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error loading products</div>
  }

  const products = data?.products || []

  if (products.length === 0) {
    return <div className="text-center py-12 text-muted-foreground">No products found</div>
  }

  return (
    <div>
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {products.length} of {data?.pagination.total || 0} products
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.has(product.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  )
}