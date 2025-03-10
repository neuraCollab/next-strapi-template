import React from "react"
import { RoughNotation, RoughNotationGroup } from "react-rough-notation"
import Arrow26 from "../ui/HandDrawnArrow"
import PhoneForm from "../ui/PhoneForm"
import Link from "next/link"
import { Button } from "../ui/Button"
import fetchContentType from "@/lib/strapi/fetchContentType"
import FranchiseCards from "@/components/ui/FranchiseCard"
import StrapiCard from "../ui/SmallCard"
import FAQ from "../ui/FAQ"
import SEOContentBlock from "../ui/TextMainPage"
import Card from "../ui/Card"

interface PhoneButtonOption {
  id: number
  text: string
}

interface PhoneFormData {
  id: number
  placeholder: string
  phone_button_option: PhoneButtonOption[]
}

interface HeaderLeftBlock {
  id: number
  title: string
  subtitle: string
}

interface HeaderRightBlock {
  id: number
  title: string
  phone_form: PhoneFormData
}

interface ButtonData {
  id: number
  text: string
  URL: string
  target: string
  variant: string
}

interface HeaderProps {
  __component: string
  id: number
  backgroundVideo: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number | null
    height: number | null
    formats: any
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
    publishedAt: string
    related: any[]
  }
  header_left_block: HeaderLeftBlock
  header_right_block: HeaderRightBlock
  button: ButtonData[]
  locale: string
}

export const mockArticles: any[] = [
  {
    id: 1,
    title: "Заголовок статьи 1",
    description: "Краткое описание статьи 1, рассказывающее о её содержимом.",
  },
  {
    id: 2,
    title: "Заголовок статьи 2",
    description: "Краткое описание статьи 2, раскрывающее основные идеи материала.",
  },
  {
    id: 3,
    title: "Заголовок статьи 3",
    description: "Краткое описание статьи 3 с интересными фактами и подробностями.",
  },
  {
    id: 4,
    title: "Заголовок статьи 4",
    description: "Краткое описание статьи 4, предназначенное для привлечения внимания.",
  },
]

export const Header = async ({ backgroundVideo, header_left_block, header_right_block, button, locale }: HeaderProps) => {
  console.log(button)

  // Собираем все варианты текста кнопки в одну строку (разделитель можно изменить по необходимости)
  const articles = await fetchContentType(
    "articles",
    {
      fields: ["title", "description"], // fields[0]=title & fields[1]=slug
      sort: ["publishedAt:desc"], // sort[0]=publishedAt:desc
      pagination: { limit: 5 }, // pagination[limit]=5
      filters: { locale: locale }, // filters[locale]=<locale>
    },
    false,
  )

  const FAQ_data = await fetchContentType(
    "faqs",
    {
      pagination: { limit: 5 }, // pagination[limit]=5
      filters: { locale: locale }, // filters[locale]=<locale>
    },
    false,
  )

  const FAQ_slides = await fetchContentType(
    "faq-slides",
    {
      pagination: { limit: 5 }, // pagination[limit]=5
      filters: { locale: locale }, // filters[locale]=<locale>
    },
    false,
  )

  // {
  //   $eq: locale
  // }
  // console.log(articles.data[0]);

  const phoneButtonText = header_right_block && header_right_block.phone_form.phone_button_option.map((option) => option.text).join(" / ")

  return (
    <>
      <header className="relative w-full h-screen overflow-hidden">
        {/* Фоновое видео */}
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted>
          <source src={"http://localhost:1337/uploads/IMG_1711_online_video_cutter_com_7fa0ca4e68.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Тёмная подложка */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        {/* Основной контейнер */}
        <div className="relative z-10 w-full h-full text-white">
          <RoughNotationGroup show>
            {/* 1) Стрелка вверху */}
            <div className="absolute top-0 left-0 w-full flex justify-center">
              <Arrow26 />
            </div>

            {/* 2) Заголовки и подзаголовки */}
            <div className="absolute top-[25%] left-0 w-full flex flex-row items-start justify-between px-8">
              {/* Левый блок */}
              <div className="max-w-[35%] inline-block text-left">
                <RoughNotation type="underline" strokeWidth={3} color="#ffffff" padding={6} animationDuration={800} iterations={1}>
                  <h1
                    className=" text-ellipsis max-w-[100%]
                    text-[22vh] font-extrabold uppercase tracking-wide
                    bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white
                    leading-none whitespace-nowrap
                  "
                  >
                    {header_left_block.title}
                  </h1>
                </RoughNotation>
                <p className=" mt-2 text-sm sm:text-base text-gray-200 text-ellipsis">{header_left_block.subtitle}</p>
              </div>

              {/* Правый блок */}
              <div className="max-w-[33%] inline-block text-right">
                <RoughNotation type="underline" strokeWidth={3} color="#ffffff" padding={6} animationDuration={800} iterations={1}>
                  <h2
                    className=" text-ellipsis max-w-[100%]
                    text-[18vh] font-bold uppercase tracking-wide leading-none whitespace-nowrap
                    bg-gradient-to-r from-green-200 via-green-500 to-yellow-500 bg-clip-text text-transparent
                    bg-[length:200%_200%] animate-gradientShift
                  "
                  >
                    {header_right_block.title}
                  </h2>
                </RoughNotation>
                <div className="mt-10">
                  <PhoneForm placeholder={header_right_block.phone_form.placeholder} buttonText={phoneButtonText} />
                </div>
              </div>
            </div>
          </RoughNotationGroup>

          {/* 3) Кнопки */}
          {button && button.length > 0 && (
            <div className="absolute bottom-[15%] left-0 w-full px-8">
              <div className="flex flex-row space-x-4">
                {button.map((btn) => (
                  <Button key={btn?.id} as={Link} href={`/${locale}${btn.URL}`} {...(btn.variant && { variant: btn.variant })}>
                    {btn.text}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
      <FranchiseCards franchises={articles.data} />

      {/* <StrapiCard articles={mockArticles} /> */}
      <FAQ slides={FAQ_slides.data} accordionItems={FAQ_data.data} />

      <SEOContentBlock />
    </>
  )
}

export default Header
