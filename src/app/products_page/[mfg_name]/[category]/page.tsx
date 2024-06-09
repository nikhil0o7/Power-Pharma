"use client";
import { PRODUCT_CATEGORIES } from '@/config';
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { ChevronDown } from "lucide-react";
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import { Category, Product } from '@/payload-types';


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
    const getCategoriesForManufacturer = (manufacturerName: string): Category[] => {
        const filteredProducts = products?.filter(product => product.manufacturer?.mfg_name === manufacturerName);

        const uniqueCategories: { [key: string]: Category } = {};
    
        filteredProducts?.forEach(product => {
            const categoryKey = product.product_category.category.trim().toLowerCase();
            if (!uniqueCategories[categoryKey]) {
                uniqueCategories[categoryKey] = product.product_category;
            }
        });
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
                        {manufacturers?.map((manufacturer, index) => {
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