import { BodyText, Heading3 } from "@jstemplate/ecommerce-ui";
import React, { useState } from "react";
import { AdditionalInfo } from "./AdditionalInfo";
import { CustomerReview } from "./CustomerReview";
import Skeleton from "react-loading-skeleton";
import * as DOMPurify from 'dompurify';
import { ProductNode } from "src/types/productSingle";

export interface ProductDescriptionProps {

  productInfo?: ProductNode;
  isLoading?: boolean;
}

export const ProductDescription = ({ productInfo, isLoading }: ProductDescriptionProps) => {
  // console.log('productInfo', productInfo)
  const [active, setActive] = useState(0);
  // const repliceContent = data[0]?.description?.replace(/<p>/g, "").replace(/<\/p>/g, "");
  // Nettoyage du HTML de la description courte du produit
  let cleanDescription = "";

  if (typeof window !== 'undefined') {
    // Côté client, sanitize la description. Utilisez shortDescription si disponible.
    const descriptionToClean = productInfo?.description || productInfo?.shortDescription || "";
    cleanDescription = DOMPurify.sanitize(descriptionToClean);
  } else {
    // Côté serveur, utilisez directement shortDescription si disponible, sinon description, sinon chaîne vide.
    cleanDescription = productInfo?.shortDescription || productInfo?.description || "";
  }

  return (
    <section className=" container mx-auto rounded-2xl bg-themeSecondary100 px-5 md:px-14 py-12">
      <div className="flex gap-4 md:gap-10 flex-col items-center md:items-start md:flex-row relative">
        <div className="">
          <div
            onClick={() => {
              setActive(0);
            }}
          >
            <Heading3
              intent="medium"
              className={` ${active === 0 ? "text-themePrimary600 border-b-2 border-themePrimary600 " : "text-themeSecondary500"
                } py-0 md:py-4 cursor-pointer`}
            >
              Description
            </Heading3>
          </div>
        </div>
        <div
          onClick={() => {
            setActive(2);
          }}
        >
          <Heading3
            intent="medium"
            className={` ${active === 2 ? "text-themePrimary600 border-b-2 border-themePrimary600" : "text-themeSecondary500"
              } py-0 md:py-4 cursor-pointer`}
          >
            Additional Information
          </Heading3>
        </div>
        <div
          onClick={() => {
            setActive(3);
          }}
        >
          <Heading3
            intent="medium"
            className={` ${active === 3 ? "text-themePrimary600 border-b-2 border-themePrimary600" : "text-themeSecondary500"
              } py-0 md:py-4 cursor-pointer`}
          >
            Review
          </Heading3>
        </div>
      </div>
      <div className="mt-6">
        {(active === 0 &&
          (!isLoading ? (
            <div className="text-themeSecondary500 mt-5 " dangerouslySetInnerHTML={{ __html: cleanDescription }} />

          ) : (
            <Skeleton height={80} />
          ))) ||
          (active === 2 && <AdditionalInfo productInfo={productInfo?.attributes} />)/* ||
          (active === 3 && <CustomerReview productId={data[0]?.id} />)*/}
      </div>
    </section>
  );
};
