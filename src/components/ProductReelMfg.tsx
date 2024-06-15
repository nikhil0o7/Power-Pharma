"use client";
import { TMfgQueryValidator } from "@/lib/validators/query-validator";
import { Product } from "@/payload-types";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import ProductListing from "./ProductListing";

interface ProductReelProps {

    title: string;
    subtitle?: string;
    href?: string;
    query: TMfgQueryValidator;
}
const FALLBACK_LIMIT = 4;

const ProductReelMfg = (props: ProductReelProps) => {
    const { title, subtitle, href, query } = props;
    const { data: queryResults, isLoading } = trpc.getInfiniteMfgProducts.useInfiniteQuery({
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextPage,
    })
    const updatedProducts = queryResults?.pages.flatMap(page => page.items)
        .map(item => ({
            ...item,
            // @ts-ignore
            manufacturer: item.manufacturer.mfg_name,
            // @ts-ignore
            product_category: item.product_category.category
        }));
    const queryManufacturer = query.manufacturer;
    const queryProductCategory = query.product_category;
    let map_products: (Product | null)[] = []
    if (updatedProducts && updatedProducts.length) {
        //@ts-ignore
        map_products = updatedProducts
    } else if (isLoading) {
        map_products = new Array<null>(
            query.limit ?? FALLBACK_LIMIT
        ).fill(null)
    }


    return (
        <section className="py-12">
            <div className="md:flex md:items-center md:justify-between mb-4">
                <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
                    {title ?
                        <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">{title}</h1>
                        : null
                    }
                    {subtitle ?
                        <p className="mt-2 text-xl font-bond text-muted-foreground">{subtitle}</p>
                        : null
                    }
                </div>
                {href ? <Link href={href} className="hidden text-sm pr-1 font-medium text-blue-600 hover:text-blue-500 md:block">View All Products<span aria-hidden="true">&rarr;</span></Link> : null}
            </div>
            <div className='relative'>
                <div className="mt-6 flex items-baseline w-full">
                    <div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
                        {
                            map_products.map((product, i) =>
                                product?.manufacturer === queryProductCategory && product?.product_category === queryManufacturer ? (
                                    <ProductListing
                                        key={`product-${i}`}
                                        product={product}
                                        index={i}
                                    />
                                ) : null
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductReelMfg;