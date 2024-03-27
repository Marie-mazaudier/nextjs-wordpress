import { BodyText, Heading3 } from "@jstemplate/ecommerce-ui";
import React, { useState, useEffect } from "react";
import { AdditionalInfo } from "./AdditionalInfo";
import { CustomerReview } from "./CustomerReview";
import Skeleton from "react-loading-skeleton";
import * as DOMPurify from 'dompurify';
import { ProductNode } from "src/types/productSingle";

export interface ProductSimpleDescriptionProps {
    productInfo?: ProductNode;
}

export const ProductSimpleDescription = ({ productInfo }: ProductSimpleDescriptionProps) => {
    // Nettoyage du HTML de la description courte du produit
    const [cleanDescription, setCleanDescription] = useState("Chargement...");

    useEffect(() => {
        if (typeof window !== 'undefined' && productInfo?.description) {
            const sanitizedDescription = DOMPurify.sanitize(productInfo.description);
            setCleanDescription(sanitizedDescription || "Description non disponible.");
        } else {
            setCleanDescription("Description non disponible.");
        }
    }, [productInfo]);
    return (
        <section className="container mx-auto py-2">
            <div className="mt-2">
                {cleanDescription ? (
                    <div className="text-themeSecondary500" dangerouslySetInnerHTML={{ __html: cleanDescription }} />
                ) : (
                    <Skeleton height={80} />
                )}
            </div>
        </section>
    );
};
