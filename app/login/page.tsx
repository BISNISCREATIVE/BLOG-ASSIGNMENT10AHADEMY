"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      await login(email, password)
      toast({
        title: "Success",
        description: "Logged in successfully!",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Login failed",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-[360px] md:max-w-[360px]">
        <div className="shadow-[0px_0px_24px_rgba(205,204,204,0.16)] rounded-xl bg-white border border-gray-100 p-6 space-y-5">
          <h1 className="text-xl font-bold tracking-[-0.03em] leading-[34px] text-gray-800">Sign In</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-semibold tracking-[-0.03em] leading-7 text-gray-600">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`h-12 rounded-xl border px-4 py-2 text-sm tracking-[-0.03em] leading-7 ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                } ${email ? "text-gray-800" : "text-gray-400"}`}
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-sm font-semibold tracking-[-0.03em] leading-7 text-gray-600">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`h-12 rounded-xl border px-4 py-2 pr-12 text-sm tracking-[-0.03em] leading-7 ${
                    errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                  } ${password ? "text-gray-800" : "text-gray-400"}`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm tracking-[-0.03em] leading-7"
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>

          <div className="h-7 flex items-center justify-center gap-0.5">
            <span className="text-sm tracking-[-0.03em] leading-7 text-gray-600">Don't have an account?</span>
            <Link
              href="/register"
              className="text-sm tracking-[-0.03em] leading-7 font-semibold text-blue-600 hover:text-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
