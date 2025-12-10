"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageGalleryProps {
  productImage: string
  productName: string
}

export default function ImageGallery({ productImage, productName }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Generate multiple views of the same product
  const images = Array.from({ length: 8 }).map(() => productImage)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="flex gap-4 items-start">
        {/* Thumbnails - hidden on mobile */}
        <div className="hidden md:flex flex-col gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-16 h-16 rounded-lg border-2 transition shrink-0 ${
                currentIndex === index ? "border-black" : "border-gray-300"
              }`}
            >
              <img
                src={img || "/placeholder.svg"}
                alt={`${productName} view ${index}`}
                className="w-full h-full object-cover rounded-md"
              />
            </button>
          ))}
        </div>

        {/* Main Image Container */}
        <div className="flex-1">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative border-2 border-blue-500 md:border-0">
            <img
              src={images[currentIndex] || "/placeholder.svg"}
              alt={productName}
              className="w-full h-full object-cover"
            />
            {/* Badge */}
            <div className="absolute top-3 left-3 bg-white px-3 py-2 border rounded-full text-xs md:text-sm font-semibold">
              ★ Highly Rated
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-end items-center gap-2 absolute bottom-4 right-4">
              <button 
                title="Previous image" 
                onClick={goToPrevious} 
                className="bg-white rounded-full p-2 shadow hover:shadow-md transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                title="Next image" 
                onClick={goToNext} 
                className="bg-white rounded-full p-2 shadow hover:shadow-md transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Thumbnail Gallery - shown only on mobile */}
      <div className="md:hidden overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-20 h-20 rounded-lg border-2 transition shrink-0 ${
                currentIndex === index ? "border-black" : "border-gray-300"
              }`}
            >
              <img
                src={img || "/placeholder.svg"}
                alt={`${productName} view ${index}`}
                className="w-full h-full object-cover rounded-md"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}