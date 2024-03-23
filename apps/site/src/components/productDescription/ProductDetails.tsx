import { ImageGallery } from "@jstemplate/ecommerce-ui";
import React from "react";
import CartAndBuy from "./CartAndBuy";
import ProductShortDescription from "./ProductShortDescription";
import AlmaWidget from "../payment/AlmaWidget";
import { ProductNode } from "src/types/productSingle";
import { ProductSimpleDescription } from "./ProductSimpleDescription";

interface ProductDetailsProps {
  data?: any;
  isLoading?: boolean;
  productInfo?: ProductNode;
}
interface MediaObject {
  src: string;
  alt: string;
  type: 'image' | 'video'; // Ajoutez un champ pour distinguer les images des vidéos
  poster?: string;
}
export const ProductDetails = ({ data, productInfo, isLoading }: ProductDetailsProps) => {
  //console.log('data?.[0]', data?.[0])
  // Utilisez le prix soldé si disponible et différent de zéro, sinon utilisez le prix régulier
  //console.log("produit information", productInfo)
  const salePriceNumeric = parseFloat(productInfo?.salePrice?.replace(',', '.') || "0");
  const regularPriceNumeric = parseFloat(productInfo?.regularPrice?.replace(',', '.') || "0");
  // console.log('productInfo', productInfo)
  const priceForAlma = salePriceNumeric && salePriceNumeric !== 0 ? salePriceNumeric : regularPriceNumeric;

  // Obtention de l'URL de la vidéo et de l'image principale
  const videoUrl = productInfo?.produitACF?.videoProduit?.node?.mediaItemUrl;
  const videoPosterUrl = productInfo?.produitACF?.videoPoster?.node?.mediaItemUrl; // Nouveau champ pour le poster de la vidéo
  const featuredImageUrl = productInfo?.featuredImage?.node?.mediaItemUrl;
  //console.log('videoPosterUrl', videoPosterUrl)
  // Construction du tableau des médias, en incluant l'image principale et la vidéo
  const mediaUrls: MediaObject[] = [];

  // Ajouter la vidéo en premier si elle existe
  if (videoUrl) {
    mediaUrls.push({
      src: videoUrl,
      alt: "Vidéo du produit",
      type: 'video',
      poster: videoPosterUrl // S'assurer que cette ligne est présente et correctement assignée
    });
  }

  // Ajouter ensuite l'image principale si elle existe
  if (featuredImageUrl) {
    mediaUrls.push({
      src: featuredImageUrl,
      alt: "Image principale",
      type: 'image',
    });
  }

  // Ajouter les images de la galerie
  productInfo?.galleryImages?.nodes.forEach(({ mediaItemUrl }) => {
    mediaUrls.push({
      src: mediaItemUrl,
      alt: "Image de galerie",
      type: 'image',
    });
  });
  //console.log('data', data)
  return (
    <section className="px-5 md:px-0">
      <div className="container mx-auto flex flex-col lg:flex-row gap-12">
        <div className=" w-full lg:w-1/2 relative">
          <div className="sticky top-[130px] ">
            <ImageGallery
              media={mediaUrls}
              discount={productInfo?.onSale}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <ProductShortDescription productInfo={productInfo} isLoading={isLoading} data={data} />
          <div className="mt-5">
            {/* Passer priceForAlma à AlmaWidget */}
            {priceForAlma && < AlmaWidget amount={priceForAlma} />}
          </div>
          <div className="mt-5">
            <CartAndBuy data={data} />
          </div>
          <ProductSimpleDescription productInfo={productInfo} />
        </div>
      </div>
    </section>
  );
};