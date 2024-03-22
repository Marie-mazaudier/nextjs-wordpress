import { BodyText, Heading3 } from "@jstemplate/ecommerce-ui";
import React, { useState } from "react";
import { AdditionalInfo } from "./AdditionalInfo";
import { CustomerReview } from "./CustomerReview";
import Skeleton from "react-loading-skeleton";
import * as DOMPurify from 'dompurify';
import { ProductNode } from "src/types/productSingle";

export interface ProductSimpleDescriptionProps {

    productInfo?: ProductNode;
    isLoading?: boolean;
}

export const ProductSimpleDescription = ({ productInfo, isLoading }: ProductSimpleDescriptionProps) => {

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
        <section className=" container mx-auto  py-2">

            <div className="mt-2">
                {
                    (!isLoading ? (
                        <div className="text-themeSecondary500  " dangerouslySetInnerHTML={{ __html: cleanDescription }} />

                    ) : (
                        <Skeleton height={80} />
                    ))}
            </div>
        </section>
    );
};
