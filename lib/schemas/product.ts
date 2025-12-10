import { z } from "zod"

// Updated schema to match the API response
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number().positive(),
  category: z.string(),
  gender: z.string(),
  sport: z.string(),
  colors: z.array(z.string()),
  sizes: z.array(z.string()),
  imageUrl: z.string(),
  badge: z.string().nullable().optional(), // Changed to nullable
  rating: z.number().optional(),
  reviewCount: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const ProductsResponseSchema = z.object({
  data: z.array(ProductSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
})

export type Product = z.infer<typeof ProductSchema>
export type ProductsResponse = z.infer<typeof ProductsResponseSchema>

// Transform function to convert API product to your component format
export const transformProduct = (apiProduct: Product) => ({
  id: apiProduct.id,
  name: apiProduct.name,
  type: `${apiProduct.gender}'s ${apiProduct.category}`,
  price: apiProduct.price,
  colors: apiProduct.colors.length,
  image: apiProduct.imageUrl,
  badge: apiProduct.badge ? {
    text: apiProduct.badge,
    color: getBadgeColor(apiProduct.badge)
  } : undefined,
})

// Helper to determine badge color based on text
function getBadgeColor(badgeText: string): "red" | "green" | "blue" {
  const lowerText = badgeText.toLowerCase()
  if (lowerText.includes("off") || lowerText.includes("deal") || lowerText.includes("sale")) return "red"
  if (lowerText.includes("sustainable") || lowerText.includes("eco") || lowerText.includes("new")) return "green"
  return "blue" // default
}