"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

// Подключаем стили Swiper (можно также в глобальных стилях)
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface Franchise {
  id: number
  title: string
  description: string
  price: string
  image: string
  buttonText: string
}

export default function FranchiseSlider({ franchises }: { franchises: any[] }) {
  // Настройки Swiper
  const swiperSettings = {
    modules: [Navigation, Pagination, Autoplay],
    autoplay: { delay: 3000, disableOnInteraction: false },
    navigation: false,
    pagination: { clickable: true },
    loop: true,
    slidesPerView: 4,
    spaceBetween: 16,
    speed: 500,
  }

  // console.log(franchises[0].image);

  return (
    <div className="-mt-20 relative z-20 w-full max-w-7xl mx-auto px-4">
      <div className="relative flex items-center">
        <Swiper {...swiperSettings} className="w-full">
          {franchises.map((franchise) => (
            <SwiperSlide key={franchise.id}>
              <div className="px-2">
                {/* 
                  Добавили классы: 
                  - bg-white dark:bg-gray-800 для переключения фона
                  - text-gray-700 dark:text-gray-200 для текста
                  - transition-colors duration-300 для плавности
                */}
                <div className="shadow-lg rounded-xl overflow-hidden p-5 h-[340px] flex flex-col justify-between bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors duration-300">
                  {/* Заголовок */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={"http://localhost:1337" + franchise.image.url}
                        alt="Logo"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold">{franchise.title}</h3>
                      {/* Можем использовать более светлый оттенок в dark-теме */}
                      <p className="text-xs text-gray-500 dark:text-gray-400">{franchise.categories.map((el) => el.name).join(", ")}</p>
                    </div>
                  </div>

                  {/* Описание */}
                  <p className="text-sm mt-2 line-clamp-2 text-gray-700 dark:text-gray-300">{franchise.description}</p>

                  {/* Цена */}
                  {/* <p className="text-lg font-semibold mt-1">
                    {franchise.price}
                  </p> */}

                  {/* Картинка */}
                  <div className="w-full h-[100px] overflow-hidden rounded-md">
                    <Image
                      src={"http://localhost:1337" + franchise.image.url}
                      alt={franchise.title}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Кнопка */}
                  <button className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 text-sm rounded-md mt-3 hover:bg-blue-700 dark:hover:bg-blue-800 transition">
                    Read article
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
