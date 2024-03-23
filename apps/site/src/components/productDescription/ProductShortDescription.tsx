import { Badge, BodyText, Heading1 } from "@jstemplate/ecommerce-ui";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import * as DOMPurify from 'dompurify';

interface ProductShortDescriptionProps {
  productInfo?: any;
  isLoading?: boolean;
  data?: any;
}
const ProductShortDescription = ({ productInfo, isLoading, data }: ProductShortDescriptionProps) => {
  // const repliceContent = data?.short_description?.replace(/<p>/g, "").replace(/<\/p>/g, "");
  // Nettoyage du HTML de la description courte du produit
  // console.log('short description', productInfo)
  //const cleanDescription = typeof window === 'undefined' ? data?.short_description : DOMPurify.sanitize(data?.short_description);
  const [htmlContent, setHtmlContent] = useState('');
  useEffect(() => {
    // Mettre à jour le contenu HTML ici si nécessaire
    setHtmlContent(DOMPurify.sanitize(productInfo?.shortDescription))

  }, [productInfo?.shortDescription]);
  return (
    <div>
      {productInfo?.name ? (
        <Heading1 className="text-themeSecondary800">
          {productInfo?.name}
        </Heading1>
      ) : (
        <>
          <Skeleton height={36} />
          <Skeleton height={36} />
        </>
      )}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-4">
        <div className="flex items-center gap-2">
          {productInfo?.salePrice && (
            <>
              {/* Afficher le prix soldé s'il existe */}
              <BodyText size="xl" intent="bold" className=" text-themePrimary600">
                {productInfo.salePrice} €
              </BodyText>
              {/* Barrer le prix régulier uniquement si le prix soldé existe */}
              <BodyText size="md" className="text-themeSecondary400 line-through">
                {productInfo.regularPrice} €
              </BodyText>
            </>
          )}
          {!productInfo?.salePrice && productInfo?.regularPrice && (
            // Afficher le prix régulier sans le barrer s'il n'y a pas de prix soldé
            <BodyText size="xl" intent="bold" className="text-themePrimary600">
              {productInfo.regularPrice} €
            </BodyText>
          )}
        </div>
        <div className="bg-themeSecondary200 h-8  w-0.5 hidden md:block">

        </div>
        <div className=" flex items-center gap-3">
          {productInfo ? (
            <div>
              {productInfo?.rating && (
                <div className="flex gap-1">
                  <FaStar className="text-base text-themeWarning500" />
                  <BodyText size="sm" className=" text-themeSecondary800">
                    {productInfo?.rating}
                  </BodyText>
                </div>
              )}
            </div>
          ) : (
            <Skeleton height={20} width={50} />
          )}
          {/*productInfo ? (
            <BodyText size="sm" className="text-themeSecondary800">
              • {productInfo?.reviews} reviews
            </BodyText>
          ) : (
            <Skeleton height={20} width={75} />
          )*/}
          {isLoading ? (
            <Skeleton height={24} width={80} borderRadius={50} />
          ) : (
            <Badge size="sm" type="pill" className="rounded-full w-fit">
              {data?.stockStatus === "IN_STOCK" ? data?.stockQuantity + " en stock" : "Vendu"}
            </Badge>
          )}
        </div>

      </div>

      {productInfo ? (
        <div className="text-themeSecondary500 mt-5 line-clamp-3" dangerouslySetInnerHTML={{ __html: htmlContent }} />

      ) : (
        <>
          <Skeleton height={24} />
          <Skeleton height={24} />
          <Skeleton height={24} />
        </>
      )}

    </div>
  );
};

export default ProductShortDescription;
