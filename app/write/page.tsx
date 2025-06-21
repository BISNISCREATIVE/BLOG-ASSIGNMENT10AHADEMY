"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Upload } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function WritePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [image, setImage] = useState<string>("")
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  const validateForm = () => {
    const newErrors: { title?: string; content?: string } = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!content.trim()) {
      newErrors.content = "Content is required"
    } else if (content.trim().length < 50) {
      newErrors.content = "Content must be at least 50 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Post published successfully!",
      })

      router.push("/profile")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </main>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Write New Post</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your post title"
                className={`w-full ${errors.title ? "border-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                {image ? (
                  <div className="relative">
                    <img src={image || "/placeholder.svg"} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                    <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => setImage("")}>
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() =>
                        setImage(
                          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%285%29-bCPn7nMtvrEyzHHVlA5TguCex4yQqy.png",
                        )
                      }
                    >
                      Use Sample Image
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">Tags</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-red-600">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type a tag and press Enter"
                className="w-full"
              />
              <p className="mt-1 text-sm text-gray-500">Press Enter to add tags</p>
            </div>

            {/* Content */}
            <div>
              <Label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here..."
                rows={12}
                className={`w-full ${errors.content ? "border-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
              <p className="mt-1 text-sm text-gray-500">{content.length} characters (minimum 50 required)</p>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
                {loading ? "Publishing..." : "Publish Post"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
