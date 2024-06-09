"use client";
import { Product } from "@/payload-types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from '@/config';
import ImageSlider from "./ImageSlider";

interface ProductListingProps {
    product: Product | null;
    index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
    const [isVisible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true)
        }, index * 75)

        return () => clearTimeout(timer)
    }, [index])

    if (!product || !isVisible) return <ProductPlaceholder />

    //@ts-ignore
    const validUrls = product.images
        .map(({ image }) =>
            typeof image === 'string' ? image : image.url
        )
        .filter(Boolean) as string[]

    if (isVisible && product) {
        return (
            <>
                <Link className={cn('invisible h-full w-full cursor-pointer group/main', {
                    'visible animate-in fade-in-5': isVisible,
                })} href={`/product/${product.id}`} key={product.id}>
                    <div className="flex flex-col w-full">
                        <ImageSlider urls={validUrls} />
                        <h3 className="mt-4 font-medium text-sm text-gray-700">
                            {product.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">{
                            //@ts-ignore
                            product.product_category?.category
                        }</p>
                        <p className="mt-1 font-medium text-sm text-gray-900">MRP: {formatPrice(product.price)}</p>
                    </div>
                </Link>
            </>
        )
    }



}

const ProductPlaceholder = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
                <Skeleton className="w-full h-full" />
            </div>
            <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
            <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
            <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
        </div>
    )
}

export default ProductListing;