"use client"

import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useEffect, useRef, useState } from "react";
import NavItemMenu from "./NavItemMenu";
import NavItem from "./NavItem";

const NavItemD = () => {
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
    const category = ["Divisions", "Contact us", "About"];
    return <div className="flex gap-4 h-full" ref={navRef}>
        {
            category.map((category, index) => {
                const handleOpen = () => {
                    if (active === index) {
                        setActive(null)
                    } else {
                        setActive(index)
                    }
                }
                const isOpen = index === active;
                return category === "Divisions" ?
                    (
                        <NavItemMenu category={category} handleOpen={handleOpen} isOpen={isOpen} key={index}
                            isAnyOpen={isAnyOpen} />
                    ) : (
                        <NavItem category_name={category} handleOpen={handleOpen} isOpen={isOpen} key={index}
                            isAnyOpen={isAnyOpen} />
                    )
            })
        }


        {/* {PRODUCT_CATEGORIES.map((category, index) => {
            const handleOpen = () => {
                if (active === index) {
                    setActive(null)
                } else {
                    setActive(index)
                }
            }
            const isOpen = index === active;
            return (
                <NavItem category={category} handleOpen={handleOpen} isOpen={isOpen} key={index}
                    isAnyOpen={isAnyOpen} />
            )
        })} */}
    </div>

}


export default NavItemD;