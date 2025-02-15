import Image from "next/image";

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        image_url: string;
        short_description: string;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="border p-4 rounded-lg shadow-sm bg-white">
            <Image
                src={product.image_url || "/a.jpg"}
                alt={product.name}
                width={300}
                height={200}
                className="rounded-lg"
            />
            <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.short_description}</p>
            <p className="text-green-600 font-bold text-xl mt-2">
                от {product.price} ₽
            </p>
        </div>
    );
}
