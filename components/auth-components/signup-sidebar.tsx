import Image from "next/image";

export default function SignupSidebar() {
  return (
    <div className="hidden md:flex w-full md:w-1/2 bg-black text-white p-8 md:p-12 flex-col justify-between">
      <div className="flex items-center">
       <div>
        <Image src="/logo (1).png" alt="Nike Logo" width={40} height={40} />
       </div>
      </div>

      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Just Do It</h1>
        <p className="text-base md:text-lg text-gray-300 max-w-sm">
          Join millions of athletes and fitness enthusiasts who trust Nike for their performance needs.
        </p>

        <div className="flex gap-2 mt-8">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>

      <div className="text-xs md:text-sm text-gray-500">© 2025 Nike. All rights reserved.</div>
    </div>
  )
}
