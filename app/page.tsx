"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import { Heart, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

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

export default function HomePage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [mostLikedPosts, setMostLikedPosts] = useState<BlogPost[]>([])
  const [currentPage, setCurrentPage] = useState(2)
  const [totalPages, setTotalPages] = useState(3)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
    fetchMostLikedPosts()
  }, [currentPage])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const mockPosts: BlogPost[] = Array.from({ length: 5 }, (_, i) => ({
        id: `post-${i + 1}`,
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
      }))

      setPosts(mockPosts)
      setTotalPages(3)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMostLikedPosts = async () => {
    try {
      const mockMostLiked: BlogPost[] = Array.from({ length: 3 }, (_, i) => ({
        id: `liked-${i + 1}`,
        title: "5 Reasons to Learn Frontend Development in 2025",
        content:
          "Frontend development is more than just building beautiful user interfaces — it's about crafting user experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for skilled frontend developers continues to rise.",
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
      }))

      setMostLikedPosts(mockMostLiked)
    } catch (error) {
      console.error("Error fetching most liked posts:", error)
    }
  }

  const handleLike = async (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )

    setMostLikedPosts(
      mostLikedPosts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className="w-full relative bg-white min-h-screen">
        <Header />
        <div className="animate-pulse max-w-[1200px] mx-auto px-4 py-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:block w-full relative bg-white h-[2094px] overflow-hidden text-left text-sm text-[#9CA3AF] font-inter">
        <Header />

        {/* Footer */}
        <div className="absolute top-[2014px] left-[calc(50%_-_720px)] bg-white border-[#E5E7EB] border-solid border-t-[1px] box-border w-[1440px] h-20 flex flex-col items-center justify-center p-2">
          <div className="relative tracking-[-0.03em] leading-7">
            © 2025 Web Programming Hack Blog All rights reserved.
          </div>
        </div>

        {/* Main Content */}
        <div className="absolute top-[128px] left-[calc(50%_-_600px)] w-[1200px] flex flex-col items-start justify-start text-[#374151]">
          <div className="self-stretch flex flex-row items-start justify-start gap-12">
            {/* Main Content Area */}
            <div className="w-[807px] flex flex-col items-center justify-center gap-6">
              <h1 className="self-stretch relative text-[28px] tracking-[-0.03em] leading-[38px] font-bold">
                Recommend For You
              </h1>

              {/* Blog Posts */}
              {posts.map((post, index) => (
                <div key={post.id}>
                  <div className="self-stretch bg-white flex flex-row items-center justify-start gap-6">
                    <Link href={`/post/${post.id}`}>
                      <img className="w-[340px] relative rounded-md h-[258px] object-cover" alt="" src="/image-5.png" />
                    </Link>
                    <div className="flex-1 flex flex-col items-start justify-start gap-4">
                      <div className="self-stretch flex flex-col items-start justify-start gap-3 text-xl">
                        <Link href={`/post/${post.id}`}>
                          <h2 className="self-stretch relative tracking-[-0.03em] leading-[34px] font-bold cursor-pointer hover:text-[#1DA1F2] transition-colors">
                            {post.title}
                          </h2>
                        </Link>
                        <div className="flex flex-row items-start justify-start gap-2 text-xs">
                          {post.tags.map((tag) => (
                            <div
                              key={tag}
                              className="rounded-lg bg-white border-[#E5E7EB] border-solid border-[1px] box-border h-7 flex flex-row items-center justify-center p-2"
                            >
                              <div className="relative tracking-[-0.03em] leading-6 text-[#374151]">{tag}</div>
                            </div>
                          ))}
                        </div>
                        <div className="self-stretch relative text-sm tracking-[-0.03em] leading-7 [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                          {post.content}
                        </div>
                      </div>
                      <div className="self-stretch flex flex-row items-center justify-start gap-3">
                        <div className="flex flex-row items-center justify-start gap-2">
                          <img
                            className="w-10 relative rounded-[50%] max-h-full object-cover"
                            alt=""
                            src="/image-6.png"
                          />
                          <div className="relative tracking-[-0.03em] leading-7 font-medium text-[#374151]">
                            {post.author.name}
                          </div>
                        </div>
                        <div className="w-1 relative rounded-[50%] bg-[#6B7280] h-1" />
                        <div className="relative tracking-[-0.03em] leading-7 text-[#9CA3AF]">27 May 2025</div>
                      </div>
                      <div className="flex flex-row items-center justify-start gap-5 text-[#9CA3AF]">
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex flex-row items-center justify-start gap-1.5 hover:text-red-500 transition-colors"
                        >
                          <Heart className={`w-5 relative h-5 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                          <div className="relative tracking-[-0.03em] leading-7">{post.likes}</div>
                        </button>
                        <div className="flex flex-row items-center justify-start gap-1.5">
                          <MessageCircle className="w-5 relative h-5 overflow-hidden shrink-0" />
                          <div className="relative tracking-[-0.03em] leading-7">{post.comments}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < posts.length - 1 && (
                    <div className="self-stretch relative border-[#E5E7EB] border-solid border-t-[1px] box-border h-px" />
                  )}
                </div>
              ))}

              {/* Pagination */}
              <div className="w-[368px] bg-white flex flex-row items-center justify-start gap-4">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex flex-row items-center justify-start gap-1.5"
                >
                  <ChevronLeft className="w-6 relative h-6 overflow-hidden shrink-0" />
                  <div className="relative tracking-[-0.03em] leading-7">Previous</div>
                </button>
                <div className="flex flex-row items-center justify-start text-center">
                  <div className="w-12 h-12 flex flex-col items-center justify-center p-2 box-border">
                    <div className="self-stretch relative tracking-[-0.03em] leading-7">1</div>
                  </div>
                  <div className="w-12 rounded-[9999px] bg-[#1DA1F2] h-12 flex flex-col items-center justify-center p-2 box-border text-white">
                    <div className="self-stretch relative tracking-[-0.03em] leading-7">2</div>
                  </div>
                  <div className="w-12 h-12 flex flex-col items-center justify-center p-2 box-border">
                    <div className="self-stretch relative tracking-[-0.03em] leading-7">3</div>
                  </div>
                  <div className="w-12 h-12 flex flex-col items-center justify-center p-2 box-border">
                    <div className="self-stretch relative tracking-[-0.03em] leading-7">...</div>
                  </div>
                </div>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex flex-row items-center justify-start gap-1.5"
                >
                  <div className="relative tracking-[-0.03em] leading-7">Next</div>
                  <ChevronRight className="w-6 relative h-6 overflow-hidden shrink-0" />
                </button>
              </div>
            </div>

            {/* Sidebar Divider */}
            <div className="w-px relative border-[#E5E7EB] border-solid border-r-[1px] box-border h-[1674px]" />

            {/* Sidebar */}
            <div className="flex-1 flex flex-col items-start justify-start gap-5 text-base">
              <h2 className="relative text-2xl tracking-[-0.03em] leading-9 font-bold text-[#374151]">Most Liked</h2>
              <div className="self-stretch bg-white flex flex-col gap-4">
                {mostLikedPosts.map((post, index) => (
                  <div key={post.id}>
                    <div className="flex-1 flex flex-col items-start justify-start gap-4">
                      <div className="self-stretch flex flex-col items-start justify-start gap-1">
                        <Link href={`/post/${post.id}`}>
                          <h3 className="self-stretch relative tracking-[-0.03em] leading-[30px] font-bold text-[#374151] cursor-pointer hover:text-[#1DA1F2] transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        <div className="self-stretch relative text-sm tracking-[-0.03em] leading-7 [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] text-[#374151]">
                          {post.content}
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-start gap-5 text-sm text-[#9CA3AF]">
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex flex-row items-center justify-start gap-1.5 hover:text-red-500 transition-colors"
                        >
                          <Heart className={`w-5 relative h-5 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                          <div className="relative tracking-[-0.03em] leading-7">{post.likes}</div>
                        </button>
                        <div className="flex flex-row items-center justify-start gap-1.5">
                          <MessageCircle className="w-5 relative h-5 overflow-hidden shrink-0" />
                          <div className="relative tracking-[-0.03em] leading-7">{post.comments}</div>
                        </div>
                      </div>
                    </div>
                    {index < mostLikedPosts.length - 1 && (
                      <div className="self-stretch relative border-[#E5E7EB] border-solid border-t-[1px] box-border h-px" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden w-full relative bg-white h-[2218px] overflow-hidden text-left text-base text-[#374151] font-outfit">
        <Header />

        <div className="absolute top-[64px] left-[0px] w-[393px] flex flex-col items-start justify-start text-xs text-[#374151] font-inter">
          <div className="self-stretch flex flex-col items-end justify-start py-6 px-4 gap-4">
            <h1 className="self-stretch relative text-xl tracking-[-0.03em] leading-[34px] font-bold">
              Recommend For You
            </h1>

            {/* Mobile Blog Posts */}
            {posts.map((post, index) => (
              <div key={post.id}>
                <div className="self-stretch bg-white flex flex-col items-start justify-center">
                  <div className="self-stretch flex flex-col items-start justify-start gap-3">
                    <div className="self-stretch flex flex-col items-start justify-start gap-2">
                      <Link href={`/post/${post.id}`}>
                        <h2 className="self-stretch relative text-base tracking-[-0.03em] leading-[30px] font-bold cursor-pointer hover:text-[#1DA1F2] transition-colors">
                          {post.title}
                        </h2>
                      </Link>
                      <div className="flex flex-row items-start justify-start gap-2">
                        {post.tags.map((tag) => (
                          <div
                            key={tag}
                            className="rounded-lg bg-white border-[#E5E7EB] border-solid border-[1px] box-border h-7 flex flex-row items-center justify-center p-2"
                          >
                            <div className="relative tracking-[-0.03em] leading-6">{tag}</div>
                          </div>
                        ))}
                      </div>
                      <div className="self-stretch relative tracking-[-0.03em] leading-6 [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                        {post.content}
                      </div>
                    </div>
                    <div className="self-stretch flex flex-row items-center justify-start gap-3">
                      <div className="flex flex-row items-center justify-start gap-2">
                        <img
                          className="w-[30px] relative rounded-[50%] max-h-full object-cover"
                          alt=""
                          src="/image-6.png"
                        />
                        <div className="relative tracking-[-0.03em] leading-6">{post.author.name}</div>
                      </div>
                      <div className="w-1 relative rounded-[50%] bg-[#6B7280] h-1" />
                      <div className="relative tracking-[-0.03em] leading-6 text-[#9CA3AF]">27 May 2025</div>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-3 text-[#9CA3AF]">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex flex-row items-center justify-start gap-1.5 hover:text-red-500 transition-colors"
                      >
                        <Heart className={`w-5 relative h-5 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                        <div className="relative tracking-[-0.03em] leading-6">{post.likes}</div>
                      </button>
                      <div className="flex flex-row items-center justify-start gap-1.5">
                        <MessageCircle className="w-5 relative h-5 overflow-hidden shrink-0" />
                        <div className="relative tracking-[-0.03em] leading-6">{post.comments}</div>
                      </div>
                    </div>
                  </div>
                </div>
                {index < posts.length - 1 && (
                  <div className="self-stretch relative border-[#E5E7EB] border-solid border-t-[1px] box-border h-px" />
                )}
              </div>
            ))}

            {/* Mobile Pagination */}
            <div className="self-stretch bg-white flex flex-row items-center justify-center">
              <div className="flex flex-row items-center justify-start gap-1.5">
                <ChevronLeft className="w-6 relative h-6 overflow-hidden shrink-0" />
                <div className="relative tracking-[-0.03em] leading-6">Previous</div>
              </div>
              <div className="flex flex-row items-center justify-start text-center">
                <div className="w-12 h-12 flex flex-col items-center justify-center p-2 box-border">
                  <div className="self-stretch relative tracking-[-0.03em] leading-6">1</div>
                </div>
                <div className="w-9 rounded-[7499.25px] bg-[#1DA1F2] h-9 flex flex-col items-center justify-center p-1.5 box-border text-[10.5px] text-white">
                  <div className="self-stretch relative tracking-[-0.03em] leading-[21px]">2</div>
                </div>
                <div className="w-12 h-12 flex flex-col items-center justify-center p-2 box-border">
                  <div className="self-stretch relative tracking-[-0.03em] leading-6">3</div>
                </div>
                <div className="w-12 h-12 flex flex-col items-center justify-center p-2 box-border">
                  <div className="self-stretch relative tracking-[-0.03em] leading-6">...</div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-start gap-1.5">
                <div className="relative tracking-[-0.03em] leading-6">Next</div>
                <ChevronRight className="w-6 relative h-6 overflow-hidden shrink-0" />
              </div>
            </div>

            {/* Mobile Section Separator */}
            <div className="self-stretch relative border-[#E5E7EB] border-solid border-t-[6px] box-border h-1.5" />

            {/* Mobile Most Liked Section */}
            <div className="self-stretch flex flex-col items-end justify-start py-6 px-4 gap-4 text-base">
              <h2 className="self-stretch relative text-xl tracking-[-0.03em] leading-[34px] font-bold">Most liked</h2>
              <div className="self-stretch flex flex-col items-start justify-start gap-3">
                {mostLikedPosts.map((post, index) => (
                  <div key={post.id} className="self-stretch h-[152px] flex flex-col items-start justify-start gap-3">
                    <div className="self-stretch flex flex-col items-start justify-start gap-1">
                      <Link href={`/post/${post.id}`}>
                        <h3 className="self-stretch relative tracking-[-0.03em] leading-[30px] font-bold cursor-pointer hover:text-[#1DA1F2] transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <div className="self-stretch relative text-xs tracking-[-0.03em] leading-6 [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                        {post.content}
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-3 text-sm text-[#9CA3AF]">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex flex-row items-center justify-start gap-1.5 hover:text-red-500 transition-colors"
                      >
                        <Heart className={`w-5 relative h-5 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                        <div className="relative tracking-[-0.03em] leading-7">{post.likes}</div>
                      </button>
                      <div className="flex flex-row items-center justify-start gap-1.5">
                        <MessageCircle className="w-5 relative h-5 overflow-hidden shrink-0" />
                        <div className="relative tracking-[-0.03em] leading-7">{post.comments}</div>
                      </div>
                    </div>
                    {index < mostLikedPosts.length - 1 && (
                      <div className="self-stretch relative border-[#E5E7EB] border-solid border-t-[1px] box-border h-px" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="w-[393px] bg-white border-[#E5E7EB] border-solid border-t-[1px] box-border h-[60px] flex flex-col items-center justify-center p-2 text-[#9CA3AF]">
              <div className="relative tracking-[-0.03em] leading-6">
                © 2025 Web Programming Hack Blog All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
