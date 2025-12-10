import { ProductsResponseSchema, transformProduct } from "@/lib/schemas/product"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export interface ProductFilters {
  gender?: string
  category?: string
  sport?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  sortBy?: string
  page?: number
  limit?: number
}

export async function fetchProducts(filters: ProductFilters = {}) {
  try {
    const params = new URLSearchParams()
    
    if (filters.gender) params.append("gender", filters.gender)
    if (filters.category) params.append("category", filters.category)
    if (filters.sport) params.append("sport", filters.sport)
    if (filters.minPrice) params.append("minPrice", filters.minPrice.toString())
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString())
    if (filters.search) params.append("search", filters.search)
    if (filters.sortBy) params.append("sortBy", filters.sortBy)
    if (filters.page) params.append("page", filters.page.toString())
    if (filters.limit) params.append("limit", filters.limit.toString())

    const url = `${API_BASE_URL}/products${params.toString() ? `?${params}` : ""}`
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok && response.status !== 304) {
      throw new Error(`Failed to fetch products: ${response.statusText}`)
    }

    const rawData = await response.json()
    
    console.log("Raw API response:", rawData)
    
    const validatedData = ProductsResponseSchema.parse(rawData)
    
    const transformedProducts = validatedData.data.map(transformProduct)
    
    return {
      products: transformedProducts,
      pagination: validatedData.pagination,
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

export async function fetchProductById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`)
    }

    const data = await response.json()
    return transformProduct(data)
  } catch (error) {
    console.error("Error fetching product:", error)
    throw error
  }
}