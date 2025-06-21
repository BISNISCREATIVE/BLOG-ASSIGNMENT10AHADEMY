"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Send } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface Comment {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  createdAt: string
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
  const { user } = useAuth()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [showAllComments, setShowAllComments] = useState(false)

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
        content: `Frontend development is more than just building beautiful user interfaces — it's about crafting user experiences that are fast, accessible, and engaging.

In today's digital landscape, frontend developers are the architects of user experience. They bridge the gap between design and functionality, creating interfaces that not only look great but also perform seamlessly across devices and platforms.

Here are five compelling reasons why learning frontend development in 2025 is a smart career move:

1. **High Demand and Job Security**
The demand for skilled frontend developers continues to grow as businesses prioritize digital presence and user experience. Companies across all industries need professionals who can create engaging, responsive web applications.

2. **Creative and Technical Balance**
Frontend development offers the perfect blend of creativity and technical skills. You get to work with visual design elements while solving complex programming challenges.

3. **Continuous Learning and Innovation**
The frontend ecosystem is constantly evolving with new frameworks, tools, and best practices. This keeps the work exciting and ensures you're always learning something new.

4. **Remote Work Opportunities**
Frontend development is particularly well-suited for remote work, offering flexibility and work-life balance that many other careers don't provide.

5. **Competitive Salaries**
Skilled frontend developers command competitive salaries, with senior positions often reaching six-figure incomes in major tech markets.

The future of frontend development looks bright, with emerging technologies like WebAssembly, Progressive Web Apps, and advanced JavaScript frameworks opening new possibilities for what's possible in the browser.`,
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
        comments: [
          {
            id: "comment-1",
            content: "Great article! Really helpful insights about frontend development.",
            author: {
              id: "user-1",
              name: "Jane Smith",
              avatar:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%286%29-7YnUiL7yas7qFdKOGbbjULrnGqAu1c.png",
            },
            createdAt: "2025-05-27T10:00:00Z",
          },
          {
            id: "comment-2",
            content:
              "Thanks for sharing this. The points about remote work opportunities are particularly interesting.",
            author: {
              id: "user-2",
              name: "Mike Johnson",
            },
            createdAt: "2025-05-27T11:00:00Z",
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

  const handleLike = async () => {
    if (!post) return

    setPost({
      ...post,
      isLiked: !post.isLiked,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1,
    })
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !user || !post) return

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      content: newComment.trim(),
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
      createdAt: new Date().toISOString(),
    }

    setPost({
      ...post,
      comments: [...post.comments, comment],
    })
    setNewComment("")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
            <p className="text-gray-600">The post you're looking for doesn't exist.</p>
          </div>
        </main>
      </div>
    )
  }

  const displayedComments = showAllComments ? post.comments : post.comments.slice(0, 2)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {post.image && (
            <div className="aspect-video w-full overflow-hidden">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{post.author.name}</p>
                  <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    post.isLiked
                      ? "text-red-600 bg-red-50 hover:bg-red-100"
                      : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${post.isLiked ? "fill-current" : ""}`} />
                  <span>{post.likes}</span>
                </button>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MessageCircle className="h-5 w-5" />
                  <span>{post.comments.length}</span>
                </div>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <section className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Comments ({post.comments.length})</h2>

          {/* Add Comment Form */}
          {user && (
            <form onSubmit={handleComment} className="mb-8">
              <div className="flex space-x-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="mb-3"
                    rows={3}
                  />
                  <Button type="submit" disabled={!newComment.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Post Comment
                  </Button>
                </div>
              </div>
            </form>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {displayedComments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-medium text-gray-900">{comment.author.name}</p>
                    <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Show All Comments Button */}
          {post.comments.length > 2 && !showAllComments && (
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={() => setShowAllComments(true)}>
                See all {post.comments.length} comments
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
