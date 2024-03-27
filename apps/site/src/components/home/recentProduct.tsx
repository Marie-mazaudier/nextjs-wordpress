import React, { useEffect, useRef, useState } from "react";
import { Product } from "src/types/ProductByCategoryIdTypes";
import { ProductCardShop } from "@jstemplate/ecommerce-ui";
import { getSlickSettings } from "../carousel/slickCarouselSettings";
import Slider from "react-slick";
interface RecentProductsProps {
  products: Product[]; // Ceci est maintenant un tableau de produits
  type: 'jewelry' | 'watches'; // Spécifie le type de produit
  stockProductsData?: stockData;
  stockProductsLoading?: boolean;
  shareKey?: string; // Ajout de shareKey comme prop optionnelle
  wishlistProducts?: ProductInWishlist[]; // Typage à ajuster selon vos besoins
  setLoginModalOn: (isOpen: boolean) => void; // Type ajusté pour la fonction
  isUserLoggedIn: boolean;
  deleteWishlistItem: (itemId: number, shareKey: string) => Promise<void>;
  revalidate: () => void; // Ajouter la définition de type pour revalidat
}
interface ProductInWishlist {
  product_id: string; // Ajout de la propriété product_id
  item_id: number;
}
interface stockData {
  id: string;
  stock: number;
}
export const RecentProducts: React.FC<RecentProductsProps> = ({ products, type, shareKey, revalidate, wishlistProducts, setLoginModalOn, isUserLoggedIn, deleteWishlistItem }) => {

  // Configurer Slick Carousel pour afficher 3 items à la fois
  const slickSettings = getSlickSettings(3);
  const title = type === 'jewelry' ? 'Nos derniers bijoux' : 'Nos dernières montres';

  return (
    <div className="px-2 md:px-60">
      <h2 className="text-center titre_secondaire">{title}</h2>
      <Slider {...slickSettings}>
        {products.map((product, index) => (
          <div key={product.productId} className="p-4">
            <ProductCardShop key={index} data={product} revalidate={revalidate} productId={product.productId} shareKey={shareKey} wishlistProducts={wishlistProducts} setLoginModalOn={setLoginModalOn} isUserLoggedIn={isUserLoggedIn} deleteWishlistItem={deleteWishlistItem} />

          </div>
        ))}
      </Slider>
    </div>
  );
};