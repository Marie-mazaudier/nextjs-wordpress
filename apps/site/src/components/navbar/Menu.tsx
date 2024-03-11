import React from "react"
import { MENU_QUERY } from "src/data/graphQl/menu"
import { MenuQueryResponse } from "src/types/menuTypes"
import Link from "next/link"
import { BodyText } from "../../../../../packages/ecommerce-ui/src"
import { RiArrowDownSLine } from "react-icons/ri"
import { AiOutlineRight } from "react-icons/ai"
import { GiHamburgerMenu } from "react-icons/gi"
interface MenuItem {
    id: string;
    label?: string;
    path: string;
    children?: MenuItem[];
}

interface MenuProps {
    menuData: MenuItem[];
    isSticky: boolean;
}

// Fonction récursive pour rendre les items de menu et leurs enfants
const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => (
        <div key={item.id} className={`${item.children && item.children.length > 0 ? "group" : ""}`}>
            {/* Lien parent avec icône flèche si des enfants sont présents */}
            {item.children && item.children.length > 0 ? (
                <div className="relative flex items-center justify-center gap-1">
                    <Link legacyBehavior href={item.path}>
                        <a>
                            <BodyText
                                size="sm"
                                className="item whitespace-nowrap group-hover:text-themePrimary600 transition group-hover:duration-700 py-2"
                            >
                                {item.label}
                            </BodyText>
                        </a>
                    </Link>
                    <RiArrowDownSLine className="text-lg blanc whitespace-nowrap group-hover:text-themePrimary600 transition group-hover:duration-700" />
                    {/* Sous-menu */}
                    <div className="opacity-0 absolute top-10 left-0 invisible group-hover:opacity-100 group-hover:visible transition group-hover:duration-500 absolute z-10 ease-in-out">
                        {renderMenuItems(item.children)}
                    </div>
                </div>
            ) : (
                // Lien simple sans enfants
                <Link legacyBehavior href={item.path}>
                    <a>
                        <BodyText
                            size="sm"
                            className=" blanc whitespace-nowrap hover:text-themePrimary600 transition hover:duration-700 py-2"
                        >
                            {item.label}
                        </BodyText>
                    </a>
                </Link>
            )}
        </div>
    ));
};

export const Menu = ({ isSticky, menuData }: MenuProps) => {
    return (
        <nav className={`bg-transparent hidden md:block ${isSticky ? 'black-menu' : 'white-menu'}`}>
            <div className="container mx-auto px-5 md:px-0 flex items-center justify-center">
                <div className="flex items-center gap-14">
                    <div className="hidden lg:block">
                        <div className="flex justify-center gap-6">
                            {renderMenuItems(menuData)}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};