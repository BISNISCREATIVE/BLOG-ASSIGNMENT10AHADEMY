"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { SearchHeaderDesktop, SearchHeaderMobile } from "@/components/search-header"
import { Search } from "lucide-react"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  content: string
  image?: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  tags: string[]
  likes: number
  comments: number
  createdAt: string
  isLiked?: boolean
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(!!query)

  useEffect(() => {
    if (query) {
      setSearchQuery(query)
      searchPosts(query)
      setHasSearched(true)
    }
  }, [query])

  const searchPosts = async (searchQuery: string) => {
    try {
      setLoading(true)
      // Mock search results
      const mockResults: BlogPost[] = searchQuery.toLowerCase().includes("frontend")
        ? [
            {
              id: "search-1",
              title: "5 Reasons to Learn Frontend Development in 2025",
              content:
                "Frontend development is more than just building beautiful user interfaces — it's about crafting user experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for skilled frontend developers continues to rise.",
              image: "/image-5.png",
              author: {
                id: "author-1",
                name: "John Doe",
                avatar: "/image-6.png",
              },
              tags: ["Programming", "Frontend", "Coding"],
              likes: 20,
              comments: 20,
              createdAt: "2025-05-27T00:00:00Z",
              isLiked: false,
            },
          ]
        : []

      setResults(mockResults)
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setHasSearched(true)
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleLike = async (postId: string) => {
    setResults(
      results.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  // Desktop Layout
  const DesktopLayout = () => (
    <div className="hidden md:block w-full relative bg-white min-h-screen overflow-hidden text-left text-sm text-dimgray font-inter">
      <SearchHeaderDesktop />

      {/* Footer */}
      <div className="fixed bottom-0 left-[calc(50%_-_720px)] bg-white border-[#E5E7EB] border-solid border-t-[1px] box-border w-[1440px] h-20 flex flex-col items-center justify-center p-2">
        <div className="relative tracking-[-0.03em] leading-7">
          © 2025 Web Programming Hack Blog All rights reserved.
        </div>
      </div>

      {!hasSearched ? (
        // Initial state - empty search
        <div className="pt-32 pb-32 min-h-[calc(100vh-160px)]">{/* Content will be added if needed */}</div>
      ) : results.length > 0 ? (
        // Found results
        <div className="absolute top-[128px] left-[120px] w-[807px] flex flex-col items-start justify-start gap-6 text-[28px] text-[#374151]">
          <b className="self-stretch relative tracking-[-0.03em] leading-[38px] whitespace-pre-wrap">
            {`Result for  "${query}"`}
          </b>
          <div className="self-stretch bg-white h-[280px] flex flex-row items-center justify-start gap-6 text-sm">
            <img
              className="w-[340px] relative rounded-md h-[258px] object-cover"
              alt=""
              src={results[0].image || "/placeholder.svg"}
            />
            <div className="flex-1 flex flex-col items-start justify-start gap-4">
              <div className="self-stretch flex flex-col items-start justify-start gap-3 text-xl">
                <b className="self-stretch relative tracking-[-0.03em] leading-[34px]">{results[0].title}</b>
                <div className="flex flex-row items-start justify-start gap-2 text-xs">
                  {results[0].tags.map((tag, index) => (
                    <div
                      key={index}
                      className="rounded-lg bg-white border-[#E5E7EB] border-solid border-[1px] box-border h-7 flex flex-row items-center justify-center p-2"
                    >
                      <div className="relative tracking-[-0.03em] leading-6 [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                        {tag}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="self-stretch relative text-sm tracking-[-0.03em] leading-7 [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  {results[0].content}
                </div>
              </div>
              <div className="self-stretch flex flex-row items-center justify-start gap-3">
                <div className="flex flex-row items-center justify-start gap-2">
                  <img
                    className="w-10 relative rounded-[50%] max-h-full object-cover"
                    alt=""
                    src={results[0].author.avatar || "/placeholder.svg"}
                  />
                  <div className="relative tracking-[-0.03em] leading-7 font-medium [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                    {results[0].author.name}
                  </div>
                </div>
                <div className="w-1 relative rounded-[50%] bg-[#374151] h-1" />
                <div className="relative tracking-[-0.03em] leading-7 text-[#6B7280] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  27 May 2025
                </div>
              </div>
              <div className="flex flex-row items-center justify-start gap-5 text-[#6B7280]">
                <button
                  onClick={() => handleLike(results[0].id)}
                  className="flex flex-row items-center justify-start gap-1.5 hover:text-[#1DA1F2] transition-colors"
                >
                  <Search className="w-5 relative h-5" />
                  <div className="relative tracking-[-0.03em] leading-7">{results[0].likes}</div>
                </button>
                <div className="flex flex-row items-center justify-start gap-1.5">
                  <Search className="w-5 relative h-5 overflow-hidden shrink-0" />
                  <div className="relative tracking-[-0.03em] leading-7">{results[0].comments}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // No results found
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] gap-6 text-center">
          <img className="w-[118.1px] relative h-[135px] object-contain" alt="" src="/fd12acbc29.png" />
          <div className="flex flex-col items-center justify-start gap-1">
            <div className="relative tracking-[-0.03em] leading-7 font-semibold text-[#374151]">No results found</div>
            <div className="relative tracking-[-0.03em] leading-7 text-[#6B7280]">Try using different keywords</div>
          </div>
          <Link
            href="/"
            className="w-[200px] rounded-[9999px] bg-[#1DA1F2] h-11 flex flex-row items-center justify-center p-2 box-border text-white font-semibold hover:bg-[#1991DB] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      )}
    </div>
  )

  // Mobile Layout
  const MobileLayout = () => (
    <div className="md:hidden w-full relative bg-white h-[852px] overflow-hidden text-left text-base text-gray font-inter">
      <SearchHeaderMobile />

      {/* Search Bar */}
      <div className="absolute top-[80px] left-[16px] w-[361px] flex flex-col items-start justify-start gap-4 text-sm">
        <form
          onSubmit={handleSearch}
          className="self-stretch rounded-xl border-[#E5E7EB] border-solid border-[1px] box-border h-12 flex flex-row items-center justify-start py-3 px-4 gap-2"
        >
          <Search className="w-6 relative h-6 overflow-hidden shrink-0 text-[#64748B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="relative tracking-[-0.03em] leading-7 bg-transparent border-none outline-none flex-1 text-[#64748B] placeholder:text-[#64748B]"
          />
        </form>

        {hasSearched && results.length > 0 && (
          <div className="self-stretch bg-white flex flex-col items-start justify-center text-xs text-[#374151]">
            <div className="self-stretch flex flex-col items-start justify-start gap-3">
              <div className="self-stretch flex flex-col items-start justify-start gap-2">
                <b className="self-stretch relative text-base tracking-[-0.03em] leading-[30px]">{results[0].title}</b>
                <div className="flex flex-row items-start justify-start gap-2">
                  {results[0].tags.map((tag, index) => (
                    <div
                      key={index}
                      className="rounded-lg bg-white border-[#E5E7EB] border-solid border-[1px] box-border h-7 flex flex-row items-center justify-center p-2"
                    >
                      <div className="relative tracking-[-0.03em] leading-6 [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                        {tag}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="self-stretch relative tracking-[-0.03em] leading-6 [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  {results[0].content}
                </div>
              </div>
              <div className="self-stretch flex flex-row items-center justify-start gap-3">
                <div className="flex flex-row items-center justify-start gap-2">
                  <img
                    className="w-[30px] relative rounded-[50%] max-h-full object-cover"
                    alt=""
                    src={results[0].author.avatar || "/placeholder.svg"}
                  />
                  <div className="relative tracking-[-0.03em] leading-6 [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                    {results[0].author.name}
                  </div>
                </div>
                <div className="w-1 relative rounded-[50%] bg-[#374151] h-1" />
                <div className="relative tracking-[-0.03em] leading-6 text-[#6B7280] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  27 May 2025
                </div>
              </div>
              <div className="flex flex-row items-center justify-start gap-3 text-[#6B7280]">
                <button
                  onClick={() => handleLike(results[0].id)}
                  className="flex flex-row items-center justify-start gap-1.5 hover:text-[#1DA1F2] transition-colors"
                >
                  <Search className="w-5 relative h-5" />
                  <div className="relative tracking-[-0.03em] leading-6">{results[0].likes}</div>
                </button>
                <div className="flex flex-row items-center justify-start gap-1.5">
                  <Search className="w-5 relative h-5 overflow-hidden shrink-0" />
                  <div className="relative tracking-[-0.03em] leading-6">{results[0].comments}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* No Results Found - Mobile */}
      {hasSearched && results.length === 0 && (
        <div className="absolute top-[261px] left-[calc(50%_-_180.5px)] w-[372px] flex flex-col items-center justify-start gap-6 text-center">
          <img className="w-[118.1px] relative h-[135px] object-contain" alt="" src="/fd12acbc29.png" />
          <div className="self-stretch flex flex-col items-center justify-start gap-1">
            <div className="self-stretch relative tracking-[-0.03em] leading-7 font-semibold text-[#374151]">
              No results found
            </div>
            <div className="self-stretch relative tracking-[-0.03em] leading-7 text-[#6B7280]">
              Try using different keywords
            </div>
          </div>
          <Link
            href="/"
            className="w-[200px] rounded-[9999px] bg-[#1DA1F2] h-11 flex flex-row items-center justify-center p-2 box-border text-white font-semibold hover:bg-[#1991DB] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      )}

      {/* Footer */}
      <div className="absolute top-[792px] left-[calc(50%_-_196.5px)] bg-white border-[#E5E7EB] border-solid border-t-[1px] box-border w-[393px] h-[60px] flex flex-col items-center justify-center p-2 text-xs text-[#6B7280]">
        <div className="relative tracking-[-0.03em] leading-6">
          © 2025 Web Programming Hack Blog All rights reserved.
        </div>
      </div>
    </div>
  )

  return (
    <>
      <DesktopLayout />
      <MobileLayout />
    </>
  )
}
