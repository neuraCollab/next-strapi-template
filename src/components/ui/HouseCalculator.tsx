"use client";

import { useState } from "react";

export default function HouseCalculator() {
    const [area, setArea] = useState(50);
    const [roofType, setRoofType] = useState("standard");
    const [foundationType, setFoundationType] = useState("slab");
    const [wallType, setWallType] = useState("brick");
    const [floors, setFloors] = useState(1);
    const [totalCost, setTotalCost] = useState(0);

    const materialCosts = {
        roof: { standard: 1000, premium: 3000, metal: 5000 },
        foundation: { slab: 2000, pile: 4000, basement: 7000 },
        wall: { brick: 3000, wood: 2500, concrete: 5000 },
    };

    const calculateCost = () => {
        const baseCost = area * 500;
        const roofCost = materialCosts.roof[roofType];
        const foundationCost = materialCosts.foundation[foundationType];
        const wallCost = materialCosts.wall[wallType] * floors;

        const total = baseCost + roofCost + foundationCost + wallCost;
        setTotalCost(total);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Калькулятор стоимости дома</h2>

            <div className="grid grid-cols-2 gap-4">
                {/* Площадь дома */}
                <div>
                    <label className="block text-gray-700">Площадь (кв. м.)</label>
                    <input
                        type="number"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        value={area}
                        onChange={(e) => setArea(Number(e.target.value))}
                    />
                </div>

                {/* Этажность */}
                <div>
                    <label className="block text-gray-700">Количество этажей</label>
                    <select
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        value={floors}
                        onChange={(e) => setFloors(Number(e.target.value))}
                    >
                        <option value={1}>1 этаж</option>
                        <option value={2}>2 этажа</option>
                        <option value={3}>3 этажа</option>
                    </select>
                </div>

                {/* Крыша */}
                <div>
                    <label className="block text-gray-700">Тип крыши</label>
                    <select
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        value={roofType}
                        onChange={(e) => setRoofType(e.target.value)}
                    >
                        <option value="standard">Стандарт</option>
                        <option value="premium">Премиум</option>
                        <option value="metal">Металлочерепица</option>
                    </select>
                </div>

                {/* Фундамент */}
                <div>
                    <label className="block text-gray-700">Тип фундамента</label>
                    <select
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        value={foundationType}
                        onChange={(e) => setFoundationType(e.target.value)}
                    >
                        <option value="slab">Монолитная плита</option>
                        <option value="pile">Свайный</option>
                        <option value="basement">С подвалом</option>
                    </select>
                </div>

                {/* Стены */}
                <div>
                    <label className="block text-gray-700">Материал стен</label>
                    <select
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        value={wallType}
                        onChange={(e) => setWallType(e.target.value)}
                    >
                        <option value="brick">Кирпич</option>
                        <option value="wood">Дерево</option>
                        <option value="concrete">Бетон</option>
                    </select>
                </div>
            </div>

            {/* Кнопка расчета */}
            <button
                className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                onClick={calculateCost}
            >
                Рассчитать стоимость
            </button>

            {/* Итоговая стоимость */}
            {totalCost > 0 && (
                <div className="mt-4 text-lg font-bold text-gray-800">
                    Итоговая стоимость: {totalCost.toLocaleString()} ₽
                </div>
            )}
        </div>
    );
}
