import { ChevronDown } from "lucide-react"
import { ProductFilters } from "@/app/api/product"

interface SidebarProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
}

export default function Sidebar({ filters, onFiltersChange }: SidebarProps) {
  const handleGenderChange = (gender: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      gender: checked ? gender : undefined,
    })
  }

  const handleSportChange = (sport: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      sport: checked ? sport : undefined,
    })
  }

  const handlePriceRange = (min: number, max: number | undefined, checked: boolean) => {
    if (checked) {
      onFiltersChange({
        ...filters,
        minPrice: min,
        maxPrice: max,
      })
    } else {
      onFiltersChange({
        ...filters,
        minPrice: undefined,
        maxPrice: undefined,
      })
    }
  }

  return (
    <aside className="w-full lg:w-48 lg:flex-shrink-0">
      {/* New Products */}
      <div className="mb-6 md:mb-8">
        <h3 className="font-semibold text-sm mb-4">New (500)</h3>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span>All New</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span>Last 30 Days</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span>Last 60 Days</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span>Made By You</span>
          </label>
        </div>
      </div>

      {/* Gender */}
      <div className="mb-8 pb-8 border-b border-border">
        <button className="flex items-center justify-between w-full mb-4">
          <span className="font-semibold text-sm">Gender</span>
          <ChevronDown size={16} />
        </button>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded"
              checked={filters.gender === "Men"}
              onChange={(e) => handleGenderChange("Men", e.target.checked)}
            />
            <span>Men</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded"
              checked={filters.gender === "Women"}
              onChange={(e) => handleGenderChange("Women", e.target.checked)}
            />
            <span>Women</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded"
              checked={filters.gender === "Unisex"}
              onChange={(e) => handleGenderChange("Unisex", e.target.checked)}
            />
            <span>Unisex</span>
          </label>
        </div>
      </div>

      {/* Kids */}
      <div className="mb-8 pb-8 border-b border-border">
        <button className="flex items-center justify-between w-full mb-4">
          <span className="font-semibold text-sm">Kids</span>
          <ChevronDown size={16} />
        </button>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span>Boys</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span>Girls</span>
          </label>
        </div>
      </div>

      {/* Shop by Price */}
      <div className="mb-8 pb-8 border-b border-border">
        <button className="flex items-center justify-between w-full mb-4">
          <span className="font-semibold text-sm">Shop by Price</span>
          <ChevronDown size={16} />
        </button>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded"
              checked={filters.minPrice === 0 && filters.maxPrice === 50}
              onChange={(e) => handlePriceRange(0, 50, e.target.checked)}
            />
            <span>$0 - $50</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded"
              checked={filters.minPrice === 50 && filters.maxPrice === 100}
              onChange={(e) => handlePriceRange(50, 100, e.target.checked)}
            />
            <span>$50 - $100</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded"
              checked={filters.minPrice === 100 && filters.maxPrice === 150}
              onChange={(e) => handlePriceRange(100, 150, e.target.checked)}
            />
            <span>$100 - $150</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded"
              checked={filters.minPrice === 150 && filters.maxPrice === undefined}
              onChange={(e) => handlePriceRange(150, undefined, e.target.checked)}
            />
            <span>$150+</span>
          </label>
        </div>
      </div>

      {/* Shoe Height */}
      <div className="mb-8">
        <button className="flex items-center justify-between w-full mb-4">
          <span className="font-semibold text-sm">Shoe Height</span>
          <ChevronDown size={16} />
        </button>
        <div className="space-y-2 text-sm">
          {["Sneaks", "High Top", "Skateboarding", "Dance"].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sports */}
      <div>
        <button className="flex items-center justify-between w-full mb-4">
          <span className="font-semibold text-sm">Sports</span>
          <ChevronDown size={16} />
        </button>
        <div className="space-y-2 text-sm">
          {["Basketball", "Football", "Running", "Soccer", "Tennis"].map((sport) => (
            <label key={sport} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded"
                checked={filters.sport === sport}
                onChange={(e) => handleSportChange(sport, e.target.checked)}
              />
              <span>{sport}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}