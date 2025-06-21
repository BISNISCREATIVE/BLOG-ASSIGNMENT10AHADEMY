"use client"

import Link from "next/link"
import { Heart, MessageCircle } from "lucide-react"

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

interface BlogCardProps {
  post: BlogPost
  onLike: (postId: string) => void
  variant?: "desktop" | "mobile" | "sidebar"
}

export default function BlogCard({ post, onLike, variant = "desktop" }: BlogCardProps) {
  if (variant === "sidebar") {
    return (
      <div className="flex-1 flex flex-col items-start justify-start gap-4">
        <div className="self-stretch flex flex-col items-start justify-start gap-1">
          <Link href={`/post/${post.id}`}>
            <h3 className="self-stretch relative tracking-[-0.03em] leading-[30px] text-base font-bold text-[#374151] hover:text-[#1DA1F2] transition-colors cursor-pointer">
              {post.title}
            </h3>
          </Link>
          <p className="self-stretch relative text-sm tracking-[-0.03em] leading-7 text-[#374151] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
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
    )
  }

  if (variant === "mobile") {
    return (
      <div className="self-stretch bg-white flex flex-col items-start justify-center">
        <div className="self-stretch flex flex-col items-start justify-start gap-3">
          <div className="self-stretch flex flex-col items-start justify-start gap-2">
            <Link href={`/post/${post.id}`}>
              <h2 className="self-stretch relative text-base tracking-[-0.03em] leading-[30px] font-bold text-[#374151] hover:text-[#1DA1F2] transition-colors cursor-pointer">
                {post.title}
              </h2>
            </Link>
            <div className="flex flex-row items-start justify-start gap-2">
              {post.tags.map((tag) => (
                <div
                  key={tag}
                  className="rounded-lg bg-white border-[#E5E7EB] border-solid border-[1px] box-border h-7 flex flex-row items-center justify-center p-2"
                >
                  <span className="relative tracking-[-0.03em] leading-6 text-xs text-[#374151]">{tag}</span>
                </div>
              ))}
            </div>
            <p className="self-stretch relative tracking-[-0.03em] leading-6 text-xs text-[#374151] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
              {post.content}
            </p>
          </div>
          <div className="self-stretch flex flex-row items-center justify-start gap-3">
            <div className="flex flex-row items-center justify-start gap-2">
              <img className="w-[30px] relative rounded-[50%] max-h-full object-cover" alt="" src="/image-6.png" />
              <span className="relative tracking-[-0.03em] leading-6 text-xs font-medium text-[#374151]">
                {post.author.name}
              </span>
            </div>
            <div className="w-1 relative rounded-[50%] bg-[#6B7280] h-1" />
            <span className="relative tracking-[-0.03em] leading-6 text-[#9CA3AF] text-xs">27 May 2025</span>
          </div>
          <div className="flex flex-row items-center justify-start gap-3 text-[#9CA3AF]">
            <button
              onClick={() => onLike(post.id)}
              className="flex flex-row items-center justify-start gap-1.5 hover:text-red-500 transition-colors"
            >
              <Heart className={`w-5 relative h-5 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
              <span className="relative tracking-[-0.03em] leading-6 text-xs">{post.likes}</span>
            </button>
            <div className="flex flex-row items-center justify-start gap-1.5">
              <MessageCircle className="w-5 relative h-5 overflow-hidden shrink-0" />
              <span className="relative tracking-[-0.03em] leading-6 text-xs">{post.comments}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Desktop variant
  return (
    <div className="self-stretch bg-white flex flex-row items-center justify-start gap-6">
      <Link href={`/post/${post.id}`}>
        <img
          className="w-[340px] relative rounded-md h-[258px] object-cover hover:opacity-90 transition-opacity cursor-pointer"
          alt=""
          src="/image-5.png"
        />
      </Link>
      <div className="flex-1 flex flex-col items-start justify-start gap-4">
        <div className="self-stretch flex flex-col items-start justify-start gap-3 text-xl">
          <Link href={`/post/${post.id}`}>
            <h2 className="self-stretch relative tracking-[-0.03em] leading-[34px] font-bold text-[#374151] hover:text-[#1DA1F2] transition-colors cursor-pointer">
              {post.title}
            </h2>
          </Link>
          <div className="flex flex-row items-start justify-start gap-2 text-xs">
            {post.tags.map((tag) => (
              <div
                key={tag}
                className="rounded-lg bg-white border-[#E5E7EB] border-solid border-[1px] box-border h-7 flex flex-row items-center justify-center p-2"
              >
                <span className="relative tracking-[-0.03em] leading-6 text-[#374151]">{tag}</span>
              </div>
            ))}
          </div>
          <p className="self-stretch relative text-sm tracking-[-0.03em] leading-7 text-[#374151] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
            {post.content}
          </p>
        </div>
        <div className="self-stretch flex flex-row items-center justify-start gap-3">
          <div className="flex flex-row items-center justify-start gap-2">
            <img className="w-10 relative rounded-[50%] max-h-full object-cover" alt="" src="/image-6.png" />
            <span className="relative tracking-[-0.03em] leading-7 font-medium text-sm text-[#374151]">
              {post.author.name}
            </span>
          </div>
          <div className="w-1 relative rounded-[50%] bg-[#6B7280] h-1" />
          <span className="relative tracking-[-0.03em] leading-7 text-[#9CA3AF] text-sm">27 May 2025</span>
        </div>
        <div className="flex flex-row items-center justify-start gap-5 text-[#9CA3AF]">
          <button
            onClick={() => onLike(post.id)}
            className="flex flex-row items-center justify-start gap-1.5 hover:text-red-500 transition-colors"
          >
            <Heart className={`w-5 relative h-5 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
            <span className="relative tracking-[-0.03em] leading-7 text-sm">{post.likes}</span>
          </button>
          <div className="flex flex-row items-center justify-start gap-1.5">
            <MessageCircle className="w-5 relative h-5 overflow-hidden shrink-0" />
            <span className="relative tracking-[-0.03em] leading-7 text-sm">{post.comments}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
