"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Heart, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CommentsModal } from "@/components/comments-modal"
import { SearchHeaderDesktop, SearchHeaderMobile } from "@/components/search-header"

interface Comment {
  id: string
  author: {
    name: string
    avatar?: string
  }
  content: string
  date: string
}

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
  comments: Comment[]
  createdAt: string
  isLiked?: boolean
}

export default function PostDetailPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [showCommentsModal, setShowCommentsModal] = useState(false)

  useEffect(() => {
    fetchPost()
  }, [params.id])

  const fetchPost = async () => {
    try {
      setLoading(true)
      // Mock post data
      const mockPost: BlogPost = {
        id: params.id as string,
        title: "5 Reasons to Learn Frontend Development in 2025",
        content: `Frontend development is more than just building beautiful user interfaces — it's about crafting user experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for skilled frontend developers continues to rise.

Here are 5 reasons why you should start learning frontend development today:`,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%285%29-bCPn7nMtvrEyzHHVlA5TguCex4yQqy.png",
        author: {
          id: "author-1",
          name: "John Doe",
          avatar: "/image-6.png",
        },
        tags: ["Programming", "Frontend", "Coding"],
        likes: 20,
        comments: [
          {
            id: "comment-1",
            author: { name: "Clarissa", avatar: "/image-6.png" },
            content: "This is super insightful — thanks for sharing!",
            date: "27 Maret 2025",
          },
          {
            id: "comment-2",
            author: { name: "Marco", avatar: "/image-6.png" },
            content: "Exactly what I needed to read today. Frontend is evolving so fast!",
            date: "27 Maret 2025",
          },
          {
            id: "comment-3",
            author: { name: "Michael Sailor", avatar: "/image-6.png" },
            content: "Great breakdown! You made complex ideas sound simple.",
            date: "27 Maret 2025",
          },
          {
            id: "comment-4",
            author: { name: "Jessica Jane", avatar: "/image-6.png" },
            content: "As a beginner in frontend, this motivates me a lot. Appreciate it!",
            date: "27 Maret 2025",
          },
          {
            id: "comment-5",
            author: { name: "Alexandra", avatar: "/image-6.png" },
            content: "Well-written and straight to the point. Keep posting content like this!",
            date: "27 Maret 2025",
          },
        ],
        createdAt: "2025-05-27T00:00:00Z",
        isLiked: false,
      }

      setPost(mockPost)
    } catch (error) {
      console.error("Error fetching post:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = () => {
    if (!post) return
    setPost({
      ...post,
      isLiked: !post.isLiked,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1,
    })
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !post) return

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: { name: "John Doe", avatar: "/image-6.png" },
      content: newComment.trim(),
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    }

    setPost({
      ...post,
      comments: [...post.comments, comment],
    })
    setNewComment("")
  }

  const handleAddComment = (content: string) => {
    if (!post) return

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: { name: "John Doe", avatar: "/image-6.png" },
      content,
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    }

    setPost({
      ...post,
      comments: [...post.comments, comment],
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Desktop Header */}
        <div className="hidden md:block">
          <SearchHeaderDesktop />
        </div>
        {/* Mobile Header */}
        <div className="block md:hidden">
          <SearchHeaderMobile />
        </div>

        <main className="max-w-[800px] mx-auto px-4 md:px-0 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        {/* Desktop Header */}
        <div className="hidden md:block">
          <SearchHeaderDesktop />
        </div>
        {/* Mobile Header */}
        <div className="block md:hidden">
          <SearchHeaderMobile />
        </div>

        <main className="max-w-[800px] mx-auto px-4 md:px-0 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
            <p className="text-gray-600">The post you're looking for doesn't exist.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <SearchHeaderDesktop />
      </div>
      {/* Mobile Header */}
      <div className="block md:hidden">
        <SearchHeaderMobile />
      </div>

      <main className="w-full">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="max-w-[800px] mx-auto px-0 py-8">
            <article className="flex flex-col gap-4 text-gray-200">
              {/* Title and Tags */}
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold tracking-[-0.02em] leading-[44px] text-gray-200">{post.title}</h1>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="h-7 px-2 text-xs tracking-[-0.03em] leading-6 border-lightgray"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium tracking-[-0.03em] leading-7">{post.author.name}</span>
                <div className="w-1 h-1 rounded-full bg-darkgray" />
                <span className="font-medium tracking-[-0.03em] leading-7 text-dimgray">27 May 2025</span>
              </div>

              <div className="border-t border-lightgray" />

              {/* Engagement Stats */}
              <div className="flex items-center gap-5 text-dimgray">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 hover:text-red-500 transition-colors ${
                    post.isLiked ? "text-red-500" : ""
                  }`}
                >
                  <Heart className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""}`} />
                  <span className="tracking-[-0.03em] leading-7">{post.likes}</span>
                </button>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-5 h-5" />
                  <span className="tracking-[-0.03em] leading-7">{post.comments.length}</span>
                </div>
              </div>

              <div className="border-t border-lightgray" />

              {/* Featured Image */}
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full rounded-md object-cover" />

              {/* Content */}
              <div className="flex flex-col gap-5 text-xl text-gray-300">
                <div className="text-base tracking-[-0.03em] leading-[30px]">
                  <p className="mb-4">
                    Frontend development is more than just building beautiful user interfaces — it's about crafting user
                    experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for skilled
                    frontend developers continues to rise.
                  </p>
                  <p>Here are 5 reasons why you should start learning frontend development today:</p>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold tracking-[-0.03em] leading-[34px]">1. High Industry Demand</h2>
                  <p className="text-base tracking-[-0.03em] leading-[30px]">
                    Tech companies, startups, and even traditional businesses are constantly looking for frontend
                    developers to help them deliver high-quality digital experiences.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold tracking-[-0.03em] leading-[34px]">
                    2. Powerful and Beginner-Friendly Tools
                  </h2>
                  <p className="text-base tracking-[-0.03em] leading-[30px]">
                    Modern frameworks like React, Vue, and Svelte make it easier than ever to build interactive UIs.
                    Their growing ecosystems and active communities mean you'll find support at every step.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold tracking-[-0.03em] leading-[34px]">3. Creative Freedom</h2>
                  <p className="text-base tracking-[-0.03em] leading-[30px]">
                    Frontend development allows you to bring your design ideas to life. From animations to responsive
                    layouts, your creativity directly impacts how users engage with a product.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold tracking-[-0.03em] leading-[34px]">4. Rapid Career Growth</h2>
                  <p className="text-base tracking-[-0.03em] leading-[30px]">
                    With roles like UI Developer, React Developer, and Frontend Engineer, you'll find plenty of
                    opportunities with competitive salaries and growth potential.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold tracking-[-0.03em] leading-[34px]">
                    5. Essential for Fullstack Development
                  </h2>
                  <p className="text-base tracking-[-0.03em] leading-[30px]">
                    Understanding frontend is crucial if you want to become a fullstack developer. It complements your
                    backend knowledge and enables you to build complete applications.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold tracking-[-0.03em] leading-[34px]">Conclusion:</h2>
                  <p className="text-base tracking-[-0.03em] leading-[30px]">
                    If you're interested in building things that users interact with daily, frontend development is the
                    path to take. Whether you're a designer learning to code or a backend developer exploring the
                    frontend, 2025 is the perfect year to start.
                  </p>
                </div>
              </div>

              <div className="border-t border-lightgray" />

              {/* Comments Section */}
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold tracking-[-0.03em] leading-9">Comments({post.comments.length})</h2>

                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/image-6.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold tracking-[-0.03em] leading-7">John Doe</span>
                </div>

                <form onSubmit={handleComment} className="flex flex-col gap-1">
                  <label className="font-semibold tracking-[-0.03em] leading-7 text-gray-300">Give your Comments</label>
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Enter your comment"
                    className="min-h-[140px] rounded-xl border-lightgray text-slategray"
                  />
                </form>

                <div className="flex justify-end">
                  <Button
                    onClick={handleComment}
                    className="w-[204px] h-12 rounded-full bg-steelblue hover:bg-steelblue/90 text-white font-semibold"
                  >
                    Send
                  </Button>
                </div>
              </div>

              <div className="border-t border-lightgray" />

              {/* Comments List */}
              <div className="flex flex-col gap-3">
                {post.comments.slice(0, 3).map((comment, index) => (
                  <div key={comment.id}>
                    <div className="bg-white flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold tracking-[-0.03em] leading-7">{comment.author.name}</span>
                          <span className="tracking-[-0.03em] leading-7 text-dimgray -mt-1">{comment.date}</span>
                        </div>
                      </div>
                      <p className="tracking-[-0.03em] leading-7">{comment.content}</p>
                    </div>
                    {index < 2 && <div className="border-t border-lightgray" />}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowCommentsModal(true)}
                className="text-steelblue underline font-semibold tracking-[-0.03em] leading-7 text-left"
              >
                See All Comments
              </button>

              <div className="border-t border-lightgray" />

              {/* Another Post Section */}
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold tracking-[-0.03em] leading-9">Another Post</h2>
                <div className="bg-white flex gap-6">
                  <img src="/image-5.png" alt="Another post" className="w-[340px] h-[258px] rounded-md object-cover" />
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xl font-bold tracking-[-0.03em] leading-[34px]">
                        5 Reasons to Learn Frontend Development in 2025
                      </h3>
                      <div className="flex gap-2">
                        {["Programming", "Frontend", "Coding"].map((tag) => (
                          <Badge key={tag} variant="outline" className="h-7 px-2 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm tracking-[-0.03em] leading-7 line-clamp-2">
                        Frontend development is more than just building beautiful user interfaces — it's about crafting
                        user experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for
                        skilled frontend developers continues to rise.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="/image-6.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <span className="font-medium tracking-[-0.03em] leading-7">John Doe</span>
                      <div className="w-1 h-1 rounded-full bg-darkgray" />
                      <span className="tracking-[-0.03em] leading-7 text-dimgray">27 May 2025</span>
                    </div>
                    <div className="flex items-center gap-5 text-dimgray">
                      <div className="flex items-center gap-1.5">
                        <Heart className="w-5 h-5" />
                        <span className="tracking-[-0.03em] leading-7">20</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="w-5 h-5" />
                        <span className="tracking-[-0.03em] leading-7">20</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="bg-white w-full flex flex-col p-4 gap-3 text-gray-200">
            {/* Title and Tags */}
            <div className="flex flex-col gap-3">
              <h1 className="text-[28px] font-bold tracking-[-0.03em] leading-[38px]">{post.title}</h1>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="h-7 px-2 text-xs border-lightgray">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-2">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium leading-6">{post.author.name}</span>
              <div className="w-1 h-1 rounded-full bg-darkgray" />
              <span className="tracking-[-0.03em] leading-6 text-dimgray">27 May 2025</span>
            </div>

            <div className="border-t border-lightgray" />

            {/* Engagement Stats */}
            <div className="flex items-center gap-3 text-dimgray">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 hover:text-red-500 transition-colors ${
                  post.isLiked ? "text-red-500" : ""
                }`}
              >
                <Heart className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""}`} />
                <span className="tracking-[-0.03em] leading-6">{post.likes}</span>
              </button>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-5 h-5" />
                <span className="tracking-[-0.03em] leading-6">{post.comments.length}</span>
              </div>
            </div>

            <div className="border-t border-lightgray" />

            {/* Featured Image */}
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-[359px] h-[203px] rounded-md object-cover"
            />

            {/* Content */}
            <div className="flex flex-col gap-3 text-base text-gray-300">
              <div className="text-sm tracking-[-0.03em] leading-7">
                <p className="mb-3">
                  Frontend development is more than just building beautiful user interfaces — it's about crafting user
                  experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for skilled
                  frontend developers continues to rise.
                </p>
                <p>Here are 5 reasons why you should start learning frontend development today:</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="font-bold tracking-[-0.03em] leading-[30px]">1. High Industry Demand</h2>
                <p className="text-sm tracking-[-0.03em] leading-7">
                  Tech companies, startups, and even traditional businesses are constantly looking for frontend
                  developers to help them deliver high-quality digital experiences.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="font-bold tracking-[-0.03em] leading-[30px]">2. Powerful and Beginner-Friendly Tools</h2>
                <p className="text-sm tracking-[-0.03em] leading-7">
                  Modern frameworks like React, Vue, and Svelte make it easier than ever to build interactive UIs. Their
                  growing ecosystems and active communities mean you'll find support at every step.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="font-bold tracking-[-0.03em] leading-[30px]">3. Creative Freedom</h2>
                <p className="text-sm tracking-[-0.03em] leading-7">
                  Frontend development allows you to bring your design ideas to life. From animations to responsive
                  layouts, your creativity directly impacts how users engage with a product.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="font-bold tracking-[-0.03em] leading-[30px]">4. Rapid Career Growth</h2>
                <p className="text-sm tracking-[-0.03em] leading-7">
                  With roles like UI Developer, React Developer, and Frontend Engineer, you'll find plenty of
                  opportunities with competitive salaries and growth potential.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="font-bold tracking-[-0.03em] leading-[30px]">5. Essential for Fullstack Development</h2>
                <p className="text-sm tracking-[-0.03em] leading-7">
                  Understanding frontend is crucial if you want to become a fullstack developer. It complements your
                  backend knowledge and enables you to build complete applications.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="font-bold tracking-[-0.03em] leading-[30px]">Conclusion:</h2>
                <p className="text-sm tracking-[-0.03em] leading-7">
                  If you're interested in building things that users interact with daily, frontend development is the
                  path to take. Whether you're a designer learning to code or a backend developer exploring the
                  frontend, 2025 is the perfect year to start.
                </p>
              </div>
            </div>

            <div className="border-t border-lightgray" />

            {/* Comments Section */}
            <div className="flex flex-col gap-3 text-sm">
              <h2 className="text-xl font-bold tracking-[-0.03em] leading-[34px]">Comments({post.comments.length})</h2>

              <div className="flex items-center gap-2 text-xs">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/image-6.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="font-semibold leading-6">John Doe</span>
              </div>

              <form onSubmit={handleComment} className="flex flex-col gap-1 text-gray-300">
                <label className="font-semibold tracking-[-0.03em] leading-7">Give your Comments</label>
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Enter your comment"
                  className="min-h-[140px] rounded-xl border-lightgray text-slategray"
                />
              </form>

              <Button
                onClick={handleComment}
                className="w-full h-12 rounded-full bg-steelblue hover:bg-steelblue/90 text-white font-semibold"
              >
                Send
              </Button>
            </div>

            <div className="border-t border-lightgray" />

            {/* Comments List */}
            <div className="flex flex-col gap-3">
              {post.comments.slice(0, 3).map((comment, index) => (
                <div key={comment.id}>
                  <div className="bg-white flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold leading-6 text-xs">{comment.author.name}</span>
                        <span className="tracking-[-0.03em] leading-6 text-dimgray text-xs -mt-1">{comment.date}</span>
                      </div>
                    </div>
                    <p className="tracking-[-0.03em] leading-6 text-xs">{comment.content}</p>
                  </div>
                  {index < 2 && <div className="border-t border-lightgray" />}
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowCommentsModal(true)}
              className="text-steelblue underline font-semibold leading-6 text-xs text-left"
            >
              See All Comments
            </button>

            <div className="border-t border-lightgray" />

            {/* Another Post Section */}
            <div className="flex flex-col gap-0">
              <h2 className="text-xl font-bold tracking-[-0.03em] leading-[34px] mb-4">Another Post</h2>
              <div className="w-[361px] bg-white flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold tracking-[-0.03em] leading-[30px]">
                    5 Reasons to Learn Frontend Development in 2025
                  </h3>
                  <div className="flex gap-2">
                    {["Programming", "Frontend", "Coding"].map((tag) => (
                      <Badge key={tag} variant="outline" className="h-7 px-2 text-xs border-lightgray">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="tracking-[-0.03em] leading-6 text-xs line-clamp-2">
                    Frontend development is more than just building beautiful user interfaces — it's about crafting user
                    experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for skilled
                    frontend developers continues to rise.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="w-[30px] h-[30px]">
                    <AvatarImage src="/image-6.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="tracking-[-0.03em] leading-6 text-xs">John Doe</span>
                  <div className="w-1 h-1 rounded-full bg-darkgray" />
                  <span className="tracking-[-0.03em] leading-6 text-dimgray text-xs">27 May 2025</span>
                </div>
                <div className="flex items-center gap-3 text-dimgray">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-5 h-5" />
                    <span className="tracking-[-0.03em] leading-6 text-xs">20</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-5 h-5" />
                    <span className="tracking-[-0.03em] leading-6 text-xs">20</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-lightgray w-full h-20 flex items-center justify-center p-2 text-dimgray">
        <div className="tracking-[-0.03em] leading-7 text-sm">
          © 2025 Web Programming Hack Blog All rights reserved.
        </div>
      </footer>

      {/* Comments Modal */}
      <CommentsModal
        isOpen={showCommentsModal}
        onClose={() => setShowCommentsModal(false)}
        comments={post.comments}
        onAddComment={handleAddComment}
      />
    </div>
  )
}
