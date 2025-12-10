import { MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground text-white text-xs py-6 px-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <p>Croatia</p>
          </div>
          <p className="hidden md:block">© 2025 Nike, Inc. All Rights Reserved</p>
        </div>

        <p className="md:hidden">© 2025 Nike, Inc. All Rights Reserved</p>

        <nav className="flex flex-wrap items-center gap-2 md:gap-6 lg:gap-6">
          <a href="#" className="hover:underline">
            Guides
          </a>
          <a href="#" className="hover:underline">
            Terms of Sale
          </a>
          <a href="#" className="hover:underline">
            Terms of Use
          </a>
          <a href="#" className="hover:underline">
            Nike Privacy Policy
          </a>
        </nav>
      </div>
    </footer>
  )
}
