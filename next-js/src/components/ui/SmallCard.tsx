"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export interface Article {
  id: number
  title: string
  description: string
}

interface StrapiCardProps {
  articles: Article[]
}

export default function StrapiCard({ articles }: StrapiCardProps) {
  return (
    <div className="container mx-auto px-4  z-10 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.map(({ id, title, description }) => (
          <Link
            key={id}
            href={`/article/${id}`}
            className="block max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="flex items-center justify-between">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
              <ArrowRight className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
