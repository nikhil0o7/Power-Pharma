"use client"

import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { trpc } from "@/trpc/client";

const NavItems = () => {
    const [active, setActive] = useState<null | number>(null);

    const isAnyOpen = active !== null;

    const navRef = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(navRef, () => setActive(null));

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setActive(null);
            }
        }
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    return <div className="flex gap-4 h-full" ref={navRef}>
        {PRODUCT_CATEGORIES.map((category, index) => {
            const handleOpen = () => {
                if (active === index) {
                    setActive(null)
                } else {
                    setActive(index)
                }
            }
            const isOpen = index === active;
            return (
                <NavItem handleOpen={handleOpen} isOpen={isOpen} key={index}
                    isAnyOpen={isAnyOpen} />
            )
        })}
    </div>

}


export default NavItems;