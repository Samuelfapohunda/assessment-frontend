"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Menu, X } from "lucide-react"
import Header from "@/components/products/header"
import Sidebar from "@/components/products/sidebar"
import ProductGrid from "@/components/products/product-grid"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ProductFilters } from "@/app/api/product"
import Footer from "@/components/products/footer"

const queryClient = new QueryClient()

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
]

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<ProductFilters>({})

  const handleSortChange = (sortValue: string) => {
    setFilters({
      ...filters,
      sortBy: sortValue,
    })
  }

  const currentSort = sortOptions.find((opt) => opt.value === filters.sortBy)?.label || "Newest"

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white">
        <Header cartCount={1} />

        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto">
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-muted-foreground mb-4"
            >
              {showFilters ? <X size={20} /> : <Menu size={20} />}
              <span>{showFilters ? "Close Filters" : "Open Filters"}</span>
            </button>
            {showFilters && (
              <Sidebar filters={filters} onFiltersChange={setFilters} />
            )}
          </div>

          {/* Desktop sidebar - always visible */}
          <div className="hidden lg:block">
            <Sidebar filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 mb-6 md:mb-8">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="hidden lg:flex text-sm text-foreground hover:text-muted-foreground font-medium  items-center gap-2"
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="18" x2="20" y2="18"></line>
                  <circle cx="8" cy="6" r="2" fill="currentColor"></circle>
                  <circle cx="16" cy="12" r="2" fill="currentColor"></circle>
                  <circle cx="12" cy="18" r="2" fill="currentColor"></circle>
                </svg>
              </button>
              <div className="flex items-center gap-3 sm:ml-auto">
                <span className="text-sm font-medium text-foreground whitespace-nowrap">Sort by:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger className="px-3 py-2 border border-input rounded-md text-sm font-medium hover:bg-accent transition-colors">
                    {currentSort}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {sortOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className={filters.sortBy === option.value ? "bg-accent" : ""}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid filters={filters} />
          </div>
        </div>

        {/* Footer */}
       <Footer />
      </div>
    </QueryClientProvider>
  )
}