import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const stepsConfig = [
  { label: "Площадь дома", name: "houseArea", type: "number", min: 20, max: 500, placeholder: "Площадь дома, м²" },
  { label: "Площадь участка", name: "landArea", type: "number", min: 1, max: 50, placeholder: "Площадь участка, сот" },
  {
    label: "Этажность",
    name: "floors",
    type: "select",
    options: [{ label: "1 этаж", value: 1 }, { label: "2 этажа", value: 2 }, { label: "3 этажа", value: 3 }],
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
];

const schema = z.object({
  houseArea: z.number().min(20).max(500),
  landArea: z.number().min(1).max(50),
  floors: z.number().min(1).max(3),
  region: z.string(),
});

export default function ConstructionCalculator() {
  const [step, setStep] = useState(0);
  const { control, handleSubmit, getValues } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { houseArea: 100, landArea: 5, floors: 1, region: "Москва" },
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, stepsConfig.length));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = (data: any) => console.log("Расчёт:", data);

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* ШАГИ */}
      <div className="flex justify-between items-center mb-8">
        {stepsConfig.map((s, index) => (
          <div key={index} className="flex flex-col items-center w-full">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-sm font-bold
              ${index === step ? "bg-green-500" : "bg-gray-300"}`}>
              {index + 1}
            </div>
            <span className={`text-xs mt-2 ${index === step ? "text-green-600" : "text-gray-400"}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* КОНТЕНТ */}
      <div className="bg-white shadow-lg rounded-lg flex max-h-[550px]">
        {/* Левая часть с картинкой (ОГРАНИЧЕНА ПО ВЫСОТЕ) */}
        <div className="w-1/2 hidden md:flex items-center justify-center p-6">
          <img src="./a.jpg" alt="House" className="rounded-lg shadow-md max-h-[400px] w-full object-cover" />
        </div>

        {/* Правая часть с формой */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Введите параметры дома</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex-grow flex flex-col justify-between">
            <div className="flex-grow">
              <div className="mt-4">
                <label className="block text-gray-700">{stepsConfig[step].placeholder}</label>
                <Controller
                  name={stepsConfig[step].name as any}
                  control={control}
                  render={({ field }) =>
                    stepsConfig[step].type === "select" ? (
                      <select {...field} className="w-full border p-3 rounded mt-2">
                        {stepsConfig[step].options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input type="number" {...field} className="w-full border p-3 rounded mt-2" />
                    )
                  }
                />
              </div>
            </div>
          </form>

          {/* КНОПКИ */}
          <div className="flex justify-between mt-6">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className={`px-6 py-3 rounded-full transition-shadow hover:shadow-lg
                ${step === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 text-white hover:bg-gray-600"}`}
            >
              Назад
            </button>

            {step < stepsConfig.length - 1 ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-shadow hover:shadow-lg"
              >
                Далее
              </button>
            ) : (
              <button
                onClick={handleSubmit(onSubmit)}
                className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-shadow hover:shadow-lg"
              >
                Рассчитать
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
