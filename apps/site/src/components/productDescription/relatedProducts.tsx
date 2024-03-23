import React from "react";
import { RelatedProductNode } from "src/types/relatedProducts";
import { ProductCardHome } from "@jstemplate/ecommerce-ui";
import { getSlickSettings } from "../carousel/slickCarouselSettings";
import Slider from "react-slick";
import { Heading2, Spaces } from "@jstemplate/ecommerce-ui";
interface RelatedProductsProps {
    relatedProducts: RelatedProductNode[];
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ relatedProducts }) => {
    // Configurer Slick Carousel pour afficher 3 items à la fois
    const slickSettings = getSlickSettings(3);

    return (
        <div className="container mx-auto px-2 md:px-40 flex justify-center"> {/* mx-auto pour centrer, ajustez px-2 md:px-60 selon besoin */}
            <div className="w-full"> {/* w-full pour la largeur et flex justify-center pour centrer le contenu */}
                <Heading2 className="text-center titre_secondaire">Produits similaires</Heading2>
                <Spaces size="sm" />

                <Slider {...slickSettings}>
                    {relatedProducts.map((product) => (
                        <div key={product.productId} className="p-4">
                            <ProductCardHome data={product} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};
