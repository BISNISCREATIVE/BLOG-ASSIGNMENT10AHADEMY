"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import BlogCard from "@/components/blog-card"
import { Search } from "lucide-react"

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
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (query) {
      searchPosts(query)
    } else {
      setResults([])
      setLoading(false)
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
                "Frontend development is more than just building beautiful user interfaces — it's about crafting user experiences that are fast, accessible, and engaging.",
              image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%285%29-bCPn7nMtvrEyzHHVlA5TguCex4yQqy.png",
              author: {
                id: "author-1",
                name: "John Doe",
                avatar:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%286%29-7YnUiL7yas7qFdKOGbbjULrnGqAu1c.png",
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

  const handleLike = async (postId: string) => {
    setResults(
      results.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Search Results</h1>
          {query && <p className="text-gray-600">Showing results for "{query}"</p>}
        </div>

        {loading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-6">
            {results.map((post) => (
              <BlogCard key={post.id} post={post} onLike={handleLike} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search terms or browse our latest posts.</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Search for posts</h3>
            <p className="text-gray-600">Enter a search term to find relevant blog posts.</p>
          </div>
        )}
      </main>
    </div>
  )
}
