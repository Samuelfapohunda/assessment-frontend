"use client"

import { use, useState } from "react"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import ImageGallery from "@/components/product-details/image-selector"
import SizeSelector from "@/components/product-details/size-selector"
import RelatedProducts from "@/components/product-details/related-products"
import { fetchProductById } from "@/app/api/product"
import Image from "next/image"
import Header from "@/components/products/header"
import Footer from "@/components/products/footer"

const queryClient = new QueryClient()

function ProductDetailContent({ productId }: { productId: string }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  // Fetch product from API
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
  })

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-2">Product not found</p>
        <p className="text-sm text-gray-500">{error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
        <Header cartCount={1} />
      {/* Main Product Section */}
     <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Mobile Layout: Product Info First */}
          <div className="md:hidden flex flex-col gap-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.type}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-medium">${product.price}</span>
                {product.badge && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {product.badge.text}
                  </Badge>
                )}
              </div>
              <div>
                <p className="text-[#007D48] font-medium text-sm">Extra 20% off w/ code SPORT</p>
              </div>
            </div>

            {/* Color Variants */}
            <div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {Array.from({ length: product.colors || 1 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-16 h-16 rounded-lg border-2 shrink-0 cursor-pointer transition ${
                      i === 0 ? "border-black bg-gray-100" : "border-gray-300 bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={product.image ? `${baseUrl}${product.image}` : "/placeholder.svg"}
                      alt={`Color ${i}`}
                      className="w-full h-full object-cover rounded-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "https://placehold.co/100x100/e5e5e5/666?text=No+Image"
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="flex flex-col gap-4 md:order-1">
            <ImageGallery productImage={product.image ? `${baseUrl}${product.image}` : "/placeholder.svg"} productName={product.name} />
          </div>

          {/* Desktop Layout: Product Info */}
          <div className="hidden md:flex flex-col gap-6 md:order-2">
            {/* Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.type}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-medium">${product.price}</span>
                {product.badge && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {product.badge.text}
                  </Badge>
                )}
              </div>
              <div>
                <p className="text-[#007D48] font-medium text-md">Extra 20% off w/ code SPORT</p>
              </div>
            </div>

            {/* Color Variants */}
            <div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {Array.from({ length: product.colors || 1 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-16 h-16 rounded-lg border-2 shrink-0 cursor-pointer transition ${
                      i === 0 ? "border-black bg-gray-100" : "border-gray-300 bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={product.image ? `${baseUrl}${product.image}` : "/placeholder.svg"}
                      alt={`Color ${i}`}
                      className="w-full h-full object-cover rounded-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "https://placehold.co/100x100/e5e5e5/666?text=No+Image"
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Size Guide Link */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Select Size</h3>
              <button className="text-sm flex items-center gap-1"> Size Guide</button>
            </div>
            {/* Size Selector */}
            <SizeSelector selectedSize={selectedSize} onSizeChange={setSelectedSize} />

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                className="w-full bg-black text-white rounded-full text-lg h-12 font-semibold hover:bg-gray-900"
                disabled={!selectedSize}
              >
                Add to Bag
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-full text-lg h-12 font-semibold bg-transparent"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`w-5 h-5 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                Favorite
              </Button>
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-500">
              By adding an item to your cart, you agree to our{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Expandable Sections */}
        <div className="max-w-2xl mx-auto xl:ml-162  border-t border-gray-200 pt-8">
          <Accordion type="single" collapsible className="w-full" defaultValue="details">
            <AccordionItem value="details">
              <AccordionTrigger className="text-lg font-semibold">Product Details</AccordionTrigger>
              <AccordionContent className="space-y-4 text-gray-700">
                <p>
                  The Air Max 90 stays true to its running roots with the iconic Waffle sole. Plus, stitched overlays
                  and textured accents create the &apos;90s look you love. Complete with romantic hues, its visible Air
                  cushioning adds comfort to your journey.
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Padded collar</li>
                  <li>Foam midsole</li>
                  <li>Style: {product.id}</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping">
              <AccordionTrigger className="text-lg font-semibold">Shipping & Returns</AccordionTrigger>
              <AccordionContent className="space-y-4 text-gray-700">
                <p>Standard shipping: 5-7 business days. Free returns within 30 days of purchase.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="reviews">
              <AccordionTrigger className="text-lg font-semibold">
                Reviews (10) <span className="ml-2">★★★★★</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-gray-700">Highly rated by customers. Average rating: 5 stars.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts currentProductId={product.id} />
      <Footer />
    </div>
  )
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <QueryClientProvider client={queryClient}>
      <ProductDetailContent productId={id} />
    </QueryClientProvider>
  )
}