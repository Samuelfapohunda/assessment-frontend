"use client"

import { useState } from "react"
import SignupSidebar from "@/components/auth-components/signup-sidebar"
import SignInForm from "@/components/auth-components/signin"
import SignupForm from "@/components/auth-components/signup"

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(false)

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      <SignupSidebar />

      {isSignIn ? (
        <SignInForm onToggleMode={() => setIsSignIn(false)} />
      ) : (
        <SignupForm onToggleMode={() => setIsSignIn(true)} />
      )}
    </div>
  )
}