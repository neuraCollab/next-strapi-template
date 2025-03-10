"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export interface Slide {
  image: any
  alt: string
}

export interface AccordionItem {
  question: string
  answer: string
}

export interface FAQProps {
  slides: Slide[]
  accordionItems: AccordionItem[]
}

export default function FAQ({ slides, accordionItems }: FAQProps) {
  console.log(slides[0].image)

  const swiperSettings = {
    modules: [Navigation, Pagination, Autoplay],
    navigation: true,
    pagination: { clickable: true },
    autoplay: { delay: 3000, disableOnInteraction: false },
    spaceBetween: 30,
    slidesPerView: 1,
  }

  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Slider Section (Swiper) */}
        <div className="w-full lg:w-1/2">
          <Swiper {...swiperSettings} className="relative h-56 md:h-96 rounded-lg overflow-hidden">
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image
                    src={slide.image.url ? "http://localhost:1337" + slide.image.url : "/placeholder.jpg"}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Accordion Section */}
        <div className="w-full lg:w-1/2">
          <div
            id="accordion-flush"
            data-accordion="collapse"
            data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            data-inactive-classes="text-gray-500 dark:text-gray-400"
          >
            {accordionItems.map((item, index) => {
              const headingId = `accordion-flush-heading-${index + 1}`
              const bodyId = `accordion-flush-body-${index + 1}`

              return (
                <div key={index}>
                  <h2 id={headingId}>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full py-5 font-medium text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                      data-accordion-target={`#${bodyId}`}
                      aria-expanded={index === 0 ? "true" : "false"}
                      aria-controls={bodyId}
                    >
                      <span>{item.question}</span>
                      <svg
                        data-accordion-icon
                        className="w-3 h-3 rotate-180 shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                      </svg>
                    </button>
                  </h2>
                  <div id={bodyId} className="hidden" aria-labelledby={headingId}>
                    <div className="py-5 border-b border-gray-200 dark:border-gray-700">{item.answer}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
