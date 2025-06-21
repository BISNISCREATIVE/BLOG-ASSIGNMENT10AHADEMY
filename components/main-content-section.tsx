"use client"

import { Heart, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import SectionTitle from "./section-title"

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

interface MainContentSectionProps {
  posts: BlogPost[]
  onLike: (postId: string) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function MainContentSection({
  posts,
  onLike,
  currentPage,
  totalPages,
  onPageChange,
}: MainContentSectionProps) {
  return (
    <div className="w-full relative flex flex-col items-center justify-center gap-6 text-left text-sm text-[#E5E7EB] font-inter">
      <SectionTitle variant="main">Recommend For You</SectionTitle>

      <div className="self-stretch flex flex-col gap-6">
        {posts.map((post, index) => (
          <div key={post.id}>
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
            {index < posts.length - 1 && (
              <div className="self-stretch relative border-[#E5E7EB] border-solid border-t-[1px] box-border h-px my-6" />
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="w-[368px] bg-white flex flex-row items-center justify-start gap-4">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex flex-row items-center justify-start gap-1.5 text-[#374151]"
        >
          <ChevronLeft className="w-6 relative h-6 overflow-hidden shrink-0" />
          <span className="relative tracking-[-0.03em] leading-7">Previous</span>
        </button>
        <div className="flex flex-row items-center justify-start text-center">
          <div className="w-12 h-12 flex flex-col items-center justify-center p-2 box-border">
            <span className="self-stretch relative tracking-[-0.03em] leading-7 text-[#374151]">1</span>
          </div>
          <div className="w-12 rounded-[9999px] bg-[#1DA1F2] h-12 flex flex-col items-center justify-center p-2 box-border text-white">
            <span className="self-stretch relative tracking-[-0.03em] leading-7">2</span>
          </div>
          <div className="w-12 h-12 flex flex-col items-center justify-center p-2 box-border">
            <span className="self-stretch relative tracking-[-0.03em] leading-7 text-[#374151]">3</span>
          </div>
          <div className="w-12 h-12 flex flex-col items-center justify-center p-2 box-border">
            <span className="self-stretch relative tracking-[-0.03em] leading-7 text-[#374151]">...</span>
          </div>
        </div>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex flex-row items-center justify-start gap-1.5 text-[#374151]"
        >
          <span className="relative tracking-[-0.03em] leading-7">Next</span>
          <ChevronRight className="w-6 relative h-6 overflow-hidden shrink-0" />
        </button>
      </div>
    </div>
  )
}
