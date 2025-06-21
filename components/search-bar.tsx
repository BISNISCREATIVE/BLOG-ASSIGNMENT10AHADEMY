"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

interface SearchBarProps {
  className?: string
  mobile?: boolean
}

export default function SearchBar({ className = "", mobile = false }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className={`rounded-xl bg-white border-[#E5E7EB] border-solid border-[1px] box-border h-12 flex flex-row items-center justify-start py-3 px-4 gap-2 text-sm text-[#64748B] font-inter ${className}`}
    >
      <Search className="w-6 relative h-6 overflow-hidden shrink-0 text-[#64748B]" />
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="relative tracking-[-0.03em] leading-7 bg-transparent border-none outline-none flex-1 text-[#64748B] placeholder:text-[#64748B]"
      />
    </form>
  )
}
