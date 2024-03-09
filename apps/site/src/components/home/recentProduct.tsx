import React, { useEffect, useRef } from "react";
import { Product } from "src/types/recentProductsType";
import { ProductCardHome } from "@jstemplate/ecommerce-ui";
import { getSlickSettings } from "../carousel/slickCarouselSettings";
import { Heading2 } from "@jstemplate/ecommerce-ui";
import Slider from "react-slick";
interface RecentProductsProps {
  products: Product[]; // Ceci est maintenant un tableau de produits
  type: 'jewelry' | 'watches'; // Spécifie le type de produit

}
export const RecentProducts: React.FC<RecentProductsProps> = ({ products, type }) => {
  // Configurer Slick Carousel pour afficher 3 items à la fois
  const slickSettings = getSlickSettings(3);
  const title = type === 'jewelry' ? 'Nos derniers bijoux' : 'Nos dernières montres';

  return (
    <div className="px-2 md:px-20">
      <h2 className="text-center titre_secondaire">{title}</h2>
      <Slider {...slickSettings}>
        {products.map((product) => (
          <div key={product.id} className="p-4">
            <ProductCardHome data={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};