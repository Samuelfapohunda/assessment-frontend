"use client"

interface SizeSelectorProps {
  selectedSize: string | null
  onSizeChange: (size: string) => void
}

const SIZES = ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"]
const UNAVAILABLE_SIZES = ["10", "10.5", "11", "11.5"]

export default function SizeSelector({ selectedSize, onSizeChange }: SizeSelectorProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
      {SIZES.map((size) => {
        const isUnavailable = UNAVAILABLE_SIZES.includes(size)
        const isSelected = selectedSize === size

        return (
          <button
            key={size}
            onClick={() => !isUnavailable && onSizeChange(size)}
            disabled={isUnavailable}
            className={`py-3 px-2 border-2 rounded-lg font-semibold transition ${
              isSelected
                ? "border-black bg-black text-white"
                : isUnavailable
                  ? "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 hover:border-gray-400 bg-white"
            }`}
          >
            {size}
          </button>
        )
      })}
    </div>
  )
}
