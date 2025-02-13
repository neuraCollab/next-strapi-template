"use client";

import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { StrapiResponse, Article } from "@/types/types";
import { ArrowRight } from "lucide-react";

interface StrapiCardProps {
    id: number;
}

export default function StrapiCard({ id }: StrapiCardProps) {
    const { data, error } = useSWR<StrapiResponse<Article>>(`/articles/${id}?populate=*`, fetcher);

    if (error) return <p>Ошибка загрузки</p>;
    if (!data) return <p>Загрузка...</p>;

    const { title, description } = data.data.attributes;

    return (
        <Link
            href={`/article/${id}`}
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
            <div className="flex items-center justify-between">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h5>
                <ArrowRight className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
        </Link>
    );
}
