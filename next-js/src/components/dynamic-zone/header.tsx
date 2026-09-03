import React from "react"
import { RoughNotation } from "react-rough-notation"
import Link from "next/link"
import { Button } from "../elements/button"
import { strapiImage } from "@/lib/strapi/strapiImage"

interface HeaderLeftBlock {
  title?: string
  subtitle?: string
}

interface HeaderRightBlock {
  title?: string
}

interface ButtonData {
  id: number
  text: string
  URL: string
  target?: string
  variant?: "simple" | "outline" | "primary" | "muted"
}

interface HeaderProps {
  backgroundVideo?: {
    url: string
  } | null
  header_left_block?: HeaderLeftBlock
  header_right_block?: HeaderRightBlock
  button?: ButtonData[]
  locale: string
}

const DEFAULT_BUTTONS: ButtonData[] = [
  { id: 1, text: "Get Started", URL: "/blog", variant: "primary" },
  { id: 2, text: "View on GitHub", URL: "https://github.com/neuraCollab/next-strapi-template", target: "_blank", variant: "simple" },
]

export const Header = ({ backgroundVideo, header_left_block, header_right_block, button, locale }: HeaderProps) => {
  const buttons = button && button.length > 0 ? button : DEFAULT_BUTTONS
  const videoUrl = backgroundVideo?.url
    ? strapiImage(backgroundVideo.url)
    : `${process.env.NEXT_PUBLIC_API_URL}/uploads/IMG_1711_online_video_cutter_com_7fa0ca4e68.mp4`

  return (
    <header className="relative w-full h-screen min-h-[640px] overflow-hidden">
      <video className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline>
        <source src={videoUrl} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center text-white">
        <RoughNotation type="underline" strokeWidth={3} color="#ffffff" padding={6} animationDuration={800} show>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            {header_left_block?.title || "Next.js + Strapi Starter"}
          </h1>
        </RoughNotation>

        <p className="mt-6 max-w-2xl text-base text-neutral-200 sm:text-lg">
          {header_left_block?.subtitle ||
            "A production-ready template combining Next.js 14, a Strapi headless CMS, and Auth.js authentication."}
        </p>

        {header_right_block?.title && <p className="mt-2 max-w-2xl text-sm text-neutral-300 sm:text-base">{header_right_block.title}</p>}

        {buttons.length > 0 && (
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {buttons.map((btn) => (
              <Button
                key={btn.id}
                as={Link}
                href={btn.URL.startsWith("http") ? btn.URL : `/${locale}${btn.URL}`}
                target={btn.target}
                rel={btn.target === "_blank" ? "noopener noreferrer" : undefined}
                variant={btn.variant || "primary"}
              >
                {btn.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
