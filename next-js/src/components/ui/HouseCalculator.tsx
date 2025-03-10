"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

// Конфигурация шагов
const stepsConfig = [
  {
    label: "Площадь дома",
    name: "houseArea",
    type: "number",
    min: 20,
    max: 500,
    placeholder: "Площадь дома, м²",
  },
  {
    label: "Площадь участка",
    name: "landArea",
    type: "number",
    min: 1,
    max: 50,
    placeholder: "Площадь участка, сот",
  },
  {
    label: "Этажность",
    name: "floors",
    type: "select",
    options: [
      { label: "1 этаж", value: 1 },
      { label: "2 этажа", value: 2 },
      { label: "3 этажа", value: 3 },
    ],
  },
  {
    label: "Регион",
    name: "region",
    type: "select",
    options: [
      { label: "Москва", value: "Москва" },
      { label: "Санкт-Петербург", value: "Санкт-Петербург" },
      { label: "Краснодарский край", value: "Краснодарский край" },
      { label: "Свердловская область", value: "Свердловская область" },
    ],
  },
]

// Схема валидации
const schema = z.object({
  houseArea: z.number().min(20).max(500),
  landArea: z.number().min(1).max(50),
  floors: z.number().min(1).max(3),
  region: z.string(),
})

export default function ConstructionCalculator() {
  const [step, setStep] = useState(0)
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { houseArea: 100, landArea: 5, floors: 1, region: "Москва" },
  })

  const nextStep = () => setStep((prev) => Math.min(prev + 1, stepsConfig.length - 1))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0))

  const onSubmit = (data: any) => {
    console.log("Расчёт:", data)
  }

  // Определяем, какой шаг активен
  const isActive = (index: number) => index === step

  return (
    <div className="max-w-6xl mx-auto my-8">
      {/* Общий футуристический контейнер */}
      <div className="relative overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-100 transition-colors duration-300">
        {/* Полупрозрачные «неоновые» элементы на фоне */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Слева сверху светящийся круг */}
          <div className="absolute w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full top-[-4rem] left-[-4rem]" />
          {/* Справа снизу светящийся круг */}
          <div className="absolute w-72 h-72 bg-pink-400/20 blur-3xl rounded-full bottom-[-4rem] right-[-4rem]" />
        </div>

        {/* Содержимое */}
        <div className="relative z-10">
          {/* Шаги (этапы) в верхней части */}
          <div className="flex justify-between items-center px-6 pt-6 pb-4">
            {stepsConfig.map((s, index) => (
              <div key={index} className="flex flex-col items-center w-full">
                <div
                  className={
                    "w-10 h-10 flex items-center justify-center rounded-full text-white text-sm font-bold transition-colors shadow-lg " +
                    (isActive(index) ? "bg-cyan-500 dark:bg-cyan-600" : "bg-gray-300 dark:bg-gray-700")
                  }
                >
                  {index + 1}
                </div>
                <span
                  className={
                    "text-xs mt-2 transition-colors " +
                    (isActive(index) ? "text-cyan-600 dark:text-cyan-400" : "text-gray-400 dark:text-gray-500")
                  }
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Единый блок: слева картинка, справа калькулятор */}
          {/* Добавили очень сильное скругление "rounded-3xl" и overflow-hidden */}
          <div className="grid grid-cols-1 md:grid-cols-2 px-2 mb-2 rounded-3xl overflow-hidden">
            {/* Левая часть (картинка) */}
            <div className="relative h-48 md:h-auto">
              <img src="/4.jpg" alt="House" className="absolute inset-0 w-full h-full object-cover" />
            </div>

            {/* Правая часть (форма) */}
            <div className="p-6 md:p-8 bg-white dark:bg-gray-900 transition-colors duration-300 text-gray-800 dark:text-gray-100">
              <h2 className="text-2xl font-bold mb-4">Введите параметры дома</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between min-h-[250px]">
                {/* Контент шага */}
                <div>
                  <label className="block text-sm font-semibold mb-1">{stepsConfig[step].placeholder}</label>
                  <Controller
                    name={stepsConfig[step].name as any}
                    control={control}
                    render={({ field }) =>
                      stepsConfig[step].type === "select" ? (
                        <select
                          {...field}
                          className="w-full border dark:border-gray-700 p-3 rounded mt-2 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition-colors"
                        >
                          {stepsConfig[step].options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="number"
                          {...field}
                          className="w-full border dark:border-gray-700 p-3 rounded mt-2 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition-colors"
                        />
                      )
                    }
                  />
                </div>

                {/* Кнопки управления шагами */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={prevStep}
                    disabled={step === 0}
                    className={
                      "px-6 py-3 rounded-full transition-shadow hover:shadow-lg " +
                      (step === 0
                        ? "bg-gray-300 dark:bg-gray-700 text-white cursor-not-allowed"
                        : "bg-gray-500 dark:bg-gray-600 text-white hover:bg-gray-600 dark:hover:bg-gray-500")
                    }
                  >
                    Назад
                  </button>

                  {step < stepsConfig.length - 1 ? (
                    <button
                      onClick={nextStep}
                      className="px-6 py-3 bg-cyan-500 dark:bg-cyan-600 text-white rounded-full hover:bg-cyan-600 dark:hover:bg-cyan-500 transition-shadow hover:shadow-lg"
                    >
                      Далее
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-3 bg-pink-500 dark:bg-pink-600 text-white rounded-full hover:bg-pink-600 dark:hover:bg-pink-500 transition-shadow hover:shadow-lg"
                    >
                      Рассчитать
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
