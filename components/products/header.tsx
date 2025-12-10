"use client"

import { Search, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function Header({ cartCount }: { cartCount: number }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchBarOpen, setSearchBarOpen] = useState(false)

  return (
    <header className="border-b border-border bg-white sticky top-0 z-10">
      <div className="px-4 md:px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
            <div>
                <Image src="/logo (1).png" alt="Nike Logo" width={40} height={40} />
             </div>   

            <nav className="hidden md:flex items-center gap-4 md:gap-6 text-sm">
              <a href="#" className="text-foreground text-md font-medium hover:text-muted-foreground">
                Men
              </a>
              <a href="#" className="text-foreground text-md font-medium hover:text-muted-foreground">
                Women
              </a>
              <a href="#" className="text-foreground text-md font-medium hover:text-muted-foreground">
                Kids
              </a>
              <a href="/products" className="text-foreground text-md font-medium hover:text-muted-foreground">
                Collections
              </a>
              <a href="#" className="text-foreground text-md font-medium hover:text-muted-foreground">
                Contact
              </a>
            </nav>
          

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="sm:flex items-center gap-2 cursor-pointer" onClick={() => setSearchBarOpen(!searchBarOpen)}>
               <p className="text-foreground text-md font-medium hover:text-muted-foreground">Search</p>
            </div>

            <button className="flex items-center gap-1 text-sm hover:text-muted-foreground whitespace-nowrap">
              <span className="sm:inline text-md font-medium">My Cart ({cartCount})</span>
              {/*<span className="sm:hidden text-xs">({cartCount})</span>*/}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}


{/*
     {searchBarOpen ? (
                  <p>search</p>
                ) : (
                   <></> 
                  <Search size={16} className="text-muted-foreground shrink-0" />
                )}
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent text-sm placeholder-muted-foreground outline-none w-32 md:w-auto"
              /> */
    }