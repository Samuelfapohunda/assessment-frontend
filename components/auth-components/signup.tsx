"use client"
import axios from "axios"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Eye, EyeOff, Chrome, Apple } from "lucide-react"
import { useRouter } from "next/navigation"

interface SignupFormData {
  fullName: string
  email: string
  password: string
}

interface SignupFormProps {
  onToggleMode: () => void
}

export default function SignupForm({ onToggleMode }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    mode: "onBlur",
  })
  const router = useRouter()

  const onSubmit = async (data: SignupFormData) => {
    setServerError(null)
    setLoading(true)
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      const resp = await axios.post(`${baseUrl}/auth/signup`, {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      }, {
        headers: { "Content-Type": "application/json" },
      })

      const token = resp.data?.accessToken
      if (token) {
        localStorage.setItem("accessToken", token)
      }
      router.push("/products")
    } catch (err: any) {
      setServerError(err?.response?.data?.message || err?.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col justify-center overflow-y-auto">
      <div className="flex justify-center mb-6 md:mb-5">
        <p className="text-xs md:text-sm text-gray-600">
          Already have an account?{" "}
          <button 
            onClick={onToggleMode}
            className="text-black font-semibold hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>

      <div className="max-w-md mx-auto w-full">
        <h2 className="text-2xl text-center md:text-4xl font-bold text-black mb-3">Join Nike Today!</h2>
        <p className="text-sm text-center md:text-base text-gray-600 mb-6 md:mb-8">
          Create your account to start your fitness journey
        </p>

        <button className="w-full border border-gray-300 rounded-lg py-2 md:py-3 mb-3 md:mb-4 hover:bg-gray-50 flex items-center justify-center gap-2 md:gap-3">
          <Chrome size={18} className="md:w-5 md:h-5 text-gray-800" />
          <span className="text-xs md:text-sm text-gray-800 font-medium">Continue with Google</span>
        </button>

        <button className="w-full border border-gray-300 rounded-lg py-2 md:py-3 mb-4 md:mb-6 hover:bg-gray-50 flex items-center justify-center gap-2 md:gap-3">
          <Apple size={18} className="md:w-5 md:h-5 text-gray-800" />
          <span className="text-xs md:text-sm text-gray-800 font-medium">Continue with Apple</span>
        </button>

        <div className="relative mb-4 md:mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs md:text-sm">
            <span className="px-2 bg-white text-gray-600">Or sign up with</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
          <div>
            <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-1 md:mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm"
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Full name must be at least 2 characters",
                },
              })}
            />
            {errors.fullName && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-1 md:mb-2">Email</label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-1 md:mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="minimum 8 characters"
                className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? (
                  <EyeOff size={18} className="md:w-5 md:h-5" />
                ) : (
                  <Eye size={18} className="md:w-5 md:h-5" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-semibold py-2 md:py-3 rounded-full hover:bg-gray-900 transition text-sm md:text-base"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          {serverError && <p className="text-red-500 text-xs md:text-sm mt-2">{serverError}</p>}
        </form>

        <p className="text-xs text-gray-600 text-center mt-4 md:mt-6">
          By signing up, you agree to our{" "}
          <a href="#" className="underline hover:text-gray-800">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-gray-800">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}