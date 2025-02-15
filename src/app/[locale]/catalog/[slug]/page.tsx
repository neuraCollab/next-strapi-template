"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const API_URL = "http://localhost:1337/api/houses";

export default function HousePage() {
    const { slug, locale } = useParams();
    const [house, setHouse] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHouse() {
            try {
                const response = await axios.get(`${API_URL}?slug=${slug}`, {
                    params: {
                        populate: ["materials", "completions"],
                        locale: locale, // Поддержка локализации
                    },
                });

                setHouse(response.data.data[0]);
                setLoading(false);
            } catch (error) {
                console.error("Ошибка загрузки дома:", error);
                setLoading(false);
            }
        }

        if (slug) {
            fetchHouse();
        }
    }, [slug, locale]);

    if (loading) return <p className="text-center py-10">Загрузка...</p>;
    if (!house) return <p className="text-center py-10">Дом не найден</p>;

    return (
        <div className="max-w-4xl mx-auto py-10 px-6">
            <h1 className="text-3xl font-bold">{house.title}</h1>
            <p className="text-2xl text-green-600 font-semibold mt-2">
                {house.price} ₽
            </p>

            <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
                <p><strong>Площадь:</strong> {house.size}</p>
                <p><strong>Этажей:</strong> {house.floors}</p>
                <p><strong>Спален:</strong> {house.bedrooms}</p>
                <p><strong>Ванных:</strong> {house.bathrooms}</p>
                <p><strong>Срок строительства:</strong> {house.construction_time}</p>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold">Материалы:</h3>
                <ul className="list-disc pl-6 text-gray-700">
                    {house.materials && house.materials.map((material: any) => (
                        <li key={material.id}>{material.name}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold">Комплектация:</h3>
                <ul className="list-disc pl-6 text-gray-700">
                    {house.completions && house.completions.map((completion: any) => (
                        <li key={completion.id}>{completion.name} - {completion.description}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-semibold">Описание:</h3>
                <div className="mt-2 text-gray-700">
                    {house.description && <BlocksRenderer content={house.description} />}
                </div>
            </div>
        </div>
    );
}
