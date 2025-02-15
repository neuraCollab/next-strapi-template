"use client";

import { useState, useEffect } from "react";
import { FaTh, FaList } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import axios from "axios";
import ProductCard from "./ProductCard";

const API_URL = "http://localhost:1337/api/houses";

export default function CatalogPage() {
    const [houses, setHouses] = useState([]);
    const [filteredHouses, setFilteredHouses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
    const [viewType, setViewType] = useState("grid");
    const [sortOption, setSortOption] = useState("По новизне");
    const [isSortOpen, setIsSortOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(API_URL, {
                    params: { populate: ["materials", "completions"] },
                });

                setHouses(response.data.data);
                setFilteredHouses(response.data.data);
            } catch (error) {
                console.error("Ошибка загрузки данных", error);
            }
        }
        fetchData();
    }, []);

    // Фильтрация данных (включая поиск)
    useEffect(() => {
        let updatedHouses = [...houses];

        // Фильтр по поисковому запросу (нечеткое совпадение)
        if (searchQuery.length > 0) {
            updatedHouses = updatedHouses.filter((house) =>
                house.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Фильтрация по категории
        if (selectedCategory) {
            updatedHouses = updatedHouses.filter(
                (house) => house.category === selectedCategory
            );
        }

        // Фильтрация по материалам
        if (selectedMaterials.length > 0) {
            updatedHouses = updatedHouses.filter((house) =>
                selectedMaterials.every((material) =>
                    house.materials.some((m) => m.name === material)
                )
            );
        }

        // Сортировка
        switch (sortOption) {
            case "По названию":
                updatedHouses.sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
                break;
            case "По популярности":
                updatedHouses.sort((a, b) =>
                    (b.popularity || 0) - (a.popularity || 0)
                );
                break;
            case "По новизне":
                updatedHouses.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                );
                break;
        }

        setFilteredHouses(updatedHouses);
    }, [searchQuery, selectedCategory, selectedMaterials, sortOption, houses]);

    const toggleMaterialFilter = (material: string) => {
        setSelectedMaterials((prev) =>
            prev.includes(material)
                ? prev.filter((m) => m !== material)
                : [...prev, material]
        );
    };

    return (
        <div className="w-full px-10 py-6">
            <h1 className="text-3xl font-bold mb-6">Каталог домов</h1>

            <div className="flex gap-6">
                {/* Левый блок с фильтрами */}
                <aside className="w-1/4 bg-gray-100 p-6 rounded-lg shadow-md">
                    {/* Категории */}
                    <div className="space-y-3">
                        <p className="text-lg font-semibold">Категории</p>
                        {["Одноэтажные", "Двухэтажные", "Таунхаусы"].map((category) => (
                            <button
                                key={category}
                                className={`block w-full text-left text-gray-700 hover:bg-gray-200 py-2 px-2 rounded ${selectedCategory === category ? "bg-gray-300 font-bold" : ""}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <hr className="my-4 border-gray-300" />

                    {/* Фильтр по материалам */}
                    <div className="mt-4">
                        <button className="flex justify-between w-full text-lg font-semibold mb-2"
                            onClick={() => setIsMaterialsOpen(!isMaterialsOpen)}
                        >
                            Материалы {isMaterialsOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </button>
                        {isMaterialsOpen && (
                            <div className="space-y-2">
                                {["Газобетон", "Кирпич", "Керамоблок"].map((material) => (
                                    <label key={material} className="flex items-center gap-2 p-2 rounded-md bg-white shadow-sm cursor-pointer hover:bg-gray-200 transition">
                                        <input type="checkbox"
                                            checked={selectedMaterials.includes(material)}
                                            onChange={() => toggleMaterialFilter(material)}
                                            className="hidden"
                                        />
                                        <span className={`w-5 h-5 flex items-center justify-center border-2 border-gray-400 rounded ${selectedMaterials.includes(material) ? "bg-blue-500 border-blue-500 text-white" : "bg-white"}`}>
                                            {selectedMaterials.includes(material) && "✓"}
                                        </span>
                                        {material}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </aside>

                {/* Контентная область */}
                <section className="flex-1">
                    {/* Верхний блок с сортировкой и поиском */}
                    <div className="flex justify-between items-center mb-4">
                        {/* Dropdown сортировки */}
                        <div className="relative">
                            <button className="bg-gray-200 px-4 py-2 rounded-md flex items-center gap-2 shadow-md"
                                onClick={() => setIsSortOpen(!isSortOpen)}
                            >
                                {sortOption} <IoIosArrowDown />
                            </button>
                            {isSortOpen && (
                                <ul className="absolute mt-2 bg-white shadow-lg rounded-md w-48 z-10">
                                    {["По новизне", "По названию", "По популярности"].map((option) => (
                                        <li key={option} className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setSortOption(option);
                                                setIsSortOpen(false);
                                            }}
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* 🔎 Поле поиска */}


                        <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input placeholder="Поиск домов..." value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                type="search" id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />

                        </div>

                    </div>

                    {/* Отображение карточек товаров */}
                    <div className="grid grid-cols-3 gap-6">
                        {filteredHouses.length > 0 ? (
                            filteredHouses.map((house) => (
                                <ProductCard key={house.id} product={house} />
                            ))
                        ) : (
                            <p className="text-gray-500">Ничего не найдено</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
