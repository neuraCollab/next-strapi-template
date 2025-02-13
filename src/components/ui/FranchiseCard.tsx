"use client";

import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Franchise {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    buttonText: string;
}

const franchises: Franchise[] = [
    {
        id: 1,
        title: "Звездное детство",
        description: "Открой детский центр 👶 с лабиринтами и сенсорными комнатами!",
        price: "500 000 ₽",
        image: "/a.jpg",
        buttonText: "Скачать бизнес-план",
    },
    {
        id: 2,
        title: "КосмоГрад",
        description: "Космические VR-аттракционы 🚀 и батуты для детей!",
        price: "700 000 ₽",
        image: "/a.jpg",
        buttonText: "Узнать подробнее",
    },
    {
        id: 3,
        title: "Веселый Мир",
        description: "Детский развлекательный парк 🎠 с аниматорами и играми!",
        price: "400 000 ₽",
        image: "/a.jpg",
        buttonText: "Получить презентацию",
    },
    {
        id: 4,
        title: "Мир игр",
        description: "Игровые комнаты 🎮 и квест-комнаты для детей и подростков!",
        price: "600 000 ₽",
        image: "/a.jpg",
        buttonText: "Подробнее",
    },
    {
        id: 5,
        title: "СпортКид",
        description: "Детские спортивные секции ⚽ и тренировки для детей от 4 лет!",
        price: "550 000 ₽",
        image: "/a.jpg",
        buttonText: "Заказать каталог",
    },
];

export default function FranchiseSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false, // Убираем стрелки
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-6">Франшизы детских центров</h2>
            <div className="relative flex items-center">
                <Slider {...settings} className="w-full">
                    {franchises.map((franchise) => (
                        <div key={franchise.id} className="px-2">
                            <div className="bg-white shadow-lg rounded-xl overflow-hidden p-5 h-[340px] flex flex-col justify-between">
                                {/* Заголовок */}
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                        <Image src="/a.jpg" alt="Logo" width={32} height={32} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-sm font-semibold">{franchise.title}</h3>
                                        <p className="text-gray-500 text-xs">Франшиза детского центра</p>
                                    </div>
                                </div>

                                {/* Описание */}
                                <p className="text-gray-700 text-sm mt-2 line-clamp-2">{franchise.description}</p>

                                {/* Цена */}
                                <p className="text-lg font-semibold mt-1">{franchise.price}</p>

                                {/* Картинка */}
                                <div className="w-full h-[100px] overflow-hidden rounded-md">
                                    <Image src={franchise.image} alt={franchise.title} width={300} height={100} className="w-full h-full object-cover" />
                                </div>

                                {/* Кнопка */}
                                <button className="w-full bg-blue-600 text-white py-2 text-sm rounded-md mt-3 hover:bg-blue-700 transition">
                                    {franchise.buttonText}
                                </button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
