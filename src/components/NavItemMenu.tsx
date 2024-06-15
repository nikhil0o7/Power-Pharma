"use client";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import Link from 'next/link';
import { Category, Manufacturer, Product } from '@/payload-types';
import { Key } from "react";


interface NavItemProps {
    category: string;
    handleOpen: () => void;
    isOpen: boolean;
    isAnyOpen: boolean;
}

const NavItem = ({ isAnyOpen, category, handleOpen, isOpen }: NavItemProps) => {

    const { data: manufacturers, isLoading: isLoadingManufacturers } = trpc.manufacturers.useQuery({ limit: 100 });
    const { data: categories, isLoading: isLoadingCategories } = trpc.categories.useQuery({ limit: 100 });
    const { data: products, isLoading: isLoadingProducts } = trpc.products.useQuery({ limit: 1000 });
    let i =0;
    const getCategoriesForManufacturer = (manufacturerName: string): Category[] => {
        const filteredProducts = products?.filter((product: Product) => product.manufacturer?.mfg_name === manufacturerName);

        const uniqueCategories: { [key: string]: Category } = {};
    
        filteredProducts?.forEach((product: { product_category: Category; }) => {
            const categoryKey = product.product_category.category.trim().toLowerCase();
            console.log(categoryKey);
            i++;
            if (!uniqueCategories[categoryKey]) {
                uniqueCategories[categoryKey] = product.product_category;
            }
        });
        console.log(i);
        return Object.values(uniqueCategories);

    };

    return <div className="flex">
        <DropdownMenu>
            <div className="relative py-4 mt-4 flex items-center">
                <DropdownMenuTrigger asChild>
                    <Button className="gap-1.5" onClick={handleOpen} variant={isOpen ? 'secondary' : 'ghost'}>
                        {category}
                        <ChevronDown className={cn("h-4 w-4 transition-all text-muted-foreground", {
                            '-rotate-180': isOpen,
                        })} />
                    </Button>
                </DropdownMenuTrigger>
            </div>
            {
                // isOpen && (
                <div className={cn("absolute top-full inset-x-0 text-sm text-muted-foreground", {
                    "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
                })}>
                    <DropdownMenuContent className="w-64">
                        {manufacturers?.map((manufacturer: Manufacturer, index: Key | null | undefined) => {
                            const filteredCategories = getCategoriesForManufacturer(manufacturer.mfg_name);
                            return (<DropdownMenuSub key={index}>
                                <DropdownMenuSubTrigger>
                                    <span>{manufacturer?.mfg_name as unknown as string}</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    {isLoadingCategories && isLoadingProducts ? (
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>
                                                <span>View All</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    ) : (
                                        <DropdownMenuSubContent>
                                            <Link href={`/products_all_page/${manufacturer.mfg_name}`}>
                                                <DropdownMenuItem>
                                                    <span>View All</span>
                                                </DropdownMenuItem>
                                            </Link>

                                            {filteredCategories.map((category, catIndex) => (
                                                <div key={catIndex}>
                                                    <Link href={`/products_page/${manufacturer.mfg_name}/${category.category}`}>
                                                        <DropdownMenuItem key={catIndex}>
                                                            <span>{category.category}</span>
                                                        </DropdownMenuItem>
                                                    </Link>
                                                </div>

                                            ))}

                                        </DropdownMenuSubContent>
                                    )
                                    }
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            )
                        })}
                    </DropdownMenuContent>
                </div>
            }
        </DropdownMenu >
    </div >
}
export default NavItem;