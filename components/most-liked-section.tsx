"use client"

import { Heart, MessageCircle } from "lucide-react"
import SectionTitle from "./section-title"

interface BlogPost {
  id: string
  title: string
  content: string
  likes: number
  comments: number
  isLiked?: boolean
}

interface MostLikedSectionProps {
  posts: BlogPost[]
  onLike: (postId: string) => void
}

export default function MostLikedSection({ posts, onLike }: MostLikedSectionProps) {
  return (
    <div className="flex-1 w-full relative flex flex-col items-start justify-start gap-5 text-left text-base text-[#374151] font-inter">
      <SectionTitle variant="sidebar">Most Liked</SectionTitle>
      <div className="self-stretch bg-white flex flex-col items-start justify-start gap-4">
        {posts.map((post, index) => (
          <div key={post.id}>
            <div className="flex-1 flex flex-col items-start justify-start gap-4">
              <div className="self-stretch flex flex-col items-start justify-start gap-1">
                <h3 className="self-stretch relative tracking-[-0.03em] leading-[30px] font-bold">{post.title}</h3>
                <p className="self-stretch relative text-sm tracking-[-0.03em] leading-7 [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  {post.content}
                </p>
              </div>
              <div className="flex flex-row items-center justify-start gap-5 text-sm text-[#9CA3AF]">
                <button
                  onClick={() => onLike(post.id)}
                  className="flex flex-row items-center justify-start gap-1.5 hover:text-red-500 transition-colors"
                >
                  <Heart className={`w-5 relative h-5 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  <span className="relative tracking-[-0.03em] leading-7">{post.likes}</span>
                </button>
                <div className="flex flex-row items-center justify-start gap-1.5">
                  <MessageCircle className="w-5 relative h-5 overflow-hidden shrink-0" />
                  <span className="relative tracking-[-0.03em] leading-7">{post.comments}</span>
                </div>
              </div>
            </div>
            {index < posts.length - 1 && (
              <div className="self-stretch relative border-[#E5E7EB] border-solid border-t-[1px] box-border h-px my-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
