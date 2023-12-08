// ProductCategories.tsx
import React, { useState } from "react";
import { Button } from "../../atoms/button/Button";
import { Heading1 } from "../../atoms/typography/headingText/heading1";
import { Tabs } from "../../atoms/tabs/Tabs";
import { generateTabsData } from "../../data/TabsData";
import { CategoryProductCard } from "../productsCard/CategoryProductCard";

interface ProductCategoriesProps {
    data?: any;
    category?: any;
    active?: any;
    setActive?: any;
}

export const ProductCategories = ({ category, data }: ProductCategoriesProps) => {
    const [activeTab, setActiveTab] = useState(0);
    const [fadeIn, setFadeIn] = useState(false);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        setFadeIn(true);
        setTimeout(() => {
            setFadeIn(false);
        }, 500); // ajustez la durée de votre effet de fondu si nécessaire
    };

    const tabsData = generateTabsData(category?.map((cat: any) => cat.name) || []).filter(
        (tab: any) => tab.title !== "Uncategorized"
    );

    const filteredProducts = data?.filter((product: any) => {
        const productCategories = product?.categories?.map((cat: any) => cat.name) || [];
        return productCategories.includes(tabsData[activeTab]?.title);
    });

    const cardData = filteredProducts?.length > 0 ? filteredProducts : [];

    return (
        <section className="container mx-auto px-5 md:px-0">
            <Heading1 className=" text-themeSecondary800 text-center mb-16">
                Nos cuvées
            </Heading1>
            <Tabs data={tabsData} active={activeTab} setActive={handleTabClick} />
            <div className={`mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7 justify-items-center ${fadeIn ? "fade-in" : ""}`}>
                {cardData?.map((singleData: any, index: number) => (
                    <CategoryProductCard key={index} data={singleData} fadeIn={fadeIn} />
                ))}
            </div>
            <div className="mt-10 	 flex items-center justify-center">
                <Button size="xl" type="pill" color="dark">
                    Voir tous les produits
                </Button>
            </div>
        </section>
    );
};
