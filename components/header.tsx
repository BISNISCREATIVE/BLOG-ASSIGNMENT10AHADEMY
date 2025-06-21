"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Menu, X, User, LogOut, Edit } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Logo from "./logo"
import SearchBar from "./search-bar"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block w-full relative bg-white border-[#E5E7EB] border-solid border-b-[1px] box-border h-20 sticky top-0 z-50">
        <div className="w-full flex flex-row items-center justify-between py-0 px-[120px] h-full text-left text-sm font-inter">
          <div className="w-[158.6px]">
            <Logo />
          </div>
          <SearchBar className="w-[373px]" />
          <div className="flex flex-row items-center justify-start gap-6 text-[#1DA1F2]">
            {user ? (
              <>
                <Link href="/write" className="flex flex-row items-center justify-start gap-2">
                  <Edit className="w-6 relative h-6 overflow-hidden shrink-0" />
                  <div className="relative [text-decoration:underline] tracking-[-0.03em] leading-7 font-semibold">
                    Write Post
                  </div>
                </Link>
                <div className="w-px relative border-[#E5E7EB] border-solid border-r-[1px] box-border h-6" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex flex-row items-center justify-start gap-3 text-[#374151]">
                      <img className="w-10 relative rounded-[50%] max-h-full object-cover" alt="" src="/image-6.png" />
                      <div className="relative tracking-[-0.03em] leading-7 font-medium">John Doe</div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[184px] rounded-xl bg-white border-[#E5E7EB] border-solid border-[1px] box-border shadow-lg"
                    align="end"
                    sideOffset={8}
                  >
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="flex flex-row items-center justify-start py-3 px-4 gap-2 hover:bg-gray-50 cursor-pointer"
                      >
                        <User className="w-5 relative h-5 overflow-hidden shrink-0" />
                        <span className="relative tracking-[-0.03em] leading-7">Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={logout}
                      className="flex flex-row items-center justify-start py-3 px-4 gap-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <LogOut className="w-5 relative max-h-full overflow-hidden shrink-0" />
                      <span className="relative tracking-[-0.03em] leading-7">Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login" className="flex flex-row items-center justify-start">
                  <div className="relative [text-decoration:underline] tracking-[-0.03em] leading-7 font-semibold">
                    Login
                  </div>
                </Link>
                <div className="w-px relative border-[#E5E7EB] border-solid border-r-[1px] box-border h-6" />
                <Link
                  href="/register"
                  className="w-[182px] rounded-[9999px] bg-[#1DA1F2] h-11 flex flex-row items-center justify-center p-2 box-border text-white hover:bg-[#1991DB] transition-colors"
                >
                  <div className="relative tracking-[-0.03em] leading-7 font-semibold">Register</div>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden w-full relative bg-white border-[#E5E7EB] border-solid border-b-[1px] box-border h-16 sticky top-0 z-50">
        <div className="w-full flex flex-row items-center justify-between py-0 px-4 h-full text-left text-base font-outfit">
          <Logo mobile />

          <div className="flex flex-row items-center justify-start gap-6">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button>
                    <img className="w-10 h-10 object-cover rounded-full" alt="" src="/image-6.png" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[184px] rounded-xl bg-white border-[#E5E7EB] border-solid border-[1px] box-border shadow-lg"
                  align="end"
                  sideOffset={8}
                >
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex flex-row items-center justify-start py-3 px-4 gap-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <User className="w-4 relative h-4 overflow-hidden shrink-0" />
                      <span className="relative tracking-[-0.03em] leading-6">Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logout}
                    className="flex flex-row items-center justify-start py-3 px-4 gap-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <LogOut className="w-4 relative max-h-full overflow-hidden shrink-0" />
                    <span className="relative tracking-[-0.03em] leading-6">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <button onClick={() => router.push("/search")}>
                  <Search className="w-6 relative h-6 overflow-hidden shrink-0 text-[#374151]" />
                </button>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <Menu className="w-6 relative h-6 overflow-hidden shrink-0 text-[#374151]" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && !user && (
        <div className="md:hidden fixed inset-0 bg-white z-[60] flex flex-col">
          <div className="w-full border-[#E5E7EB] border-solid border-b-[1px] box-border h-16 flex flex-row items-center justify-between py-0 px-4 text-base font-outfit">
            <Logo mobile />
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="w-6 relative h-6 overflow-hidden shrink-0 text-[#374151]" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-start pt-16 px-4 gap-6">
            <Link
              href="/login"
              className="text-[#1DA1F2] text-lg font-semibold [text-decoration:underline]"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="w-[280px] rounded-[9999px] bg-[#1DA1F2] h-12 flex flex-row items-center justify-center text-white font-semibold hover:bg-[#1991DB] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
