import Link from "next/link";
import React from "react";
import { Badge } from "../../atoms/badges/Badge";
import { Placeholder } from "../../atoms/placeholder/Placeholder";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import Skeleton from "react-loading-skeleton";
import MiniCart from "../../../../../apps/site/src/components/cartLayout/minicart";

interface Product {
    slug: string;
    name: string;
    productId: string;
    regularPrice: string;
    salePrice?: string;
    stockQuantity: number;
    date: string;
    stockStatus: "IN_STOCK" | "OUT_OF_STOCK";
    featuredImage?: {
        node: {
            mediaItemUrl: string;
            altText?: string;
        };
    };

}

interface ProductCardHomeProps {
    data?: Product;
}

export const ProductCardHome = ({ data }: ProductCardHomeProps) => {
    // Calcul du pourcentage de remise si les prix de vente et réguliers sont disponibles
    const discount = data?.salePrice && data?.regularPrice
        ? ((parseFloat(data.regularPrice) - parseFloat(data.salePrice)) / parseFloat(data.regularPrice)) * 100
        : undefined;
    // console.log('data', data)
    return (
        <div className="p-5  w-full ">
            <div className="p-4 b text-center relative flex items-center justify-center">
                {data?.featuredImage ? (
                    <Placeholder
                        className="w-full"
                        key={data.productId}
                        src={data.featuredImage.node.mediaItemUrl}
                        imageWidth={350}
                        imageHeight={350}
                        alt={data.featuredImage.node.altText}
                    />
                ) : (
                    <Skeleton height={350} />
                )}
                {discount ? (
                    <Badge size="md" type="pill" className="absolute top-4 right-3 rounded-full">
                        {discount.toFixed(0)}%
                    </Badge>
                ) : null}
            </div>
            {data?.name ? (
                <Link href={`/produit/${data?.slug || ""}`}>
                    <BodyText
                        size="xl"
                        className="main_font mt-5 text-center text-xs  uppercase hover:text-themePrimary600 transition hover:duration-300 line-clamp-2"
                    >
                        {data.name}
                    </BodyText>
                </Link>
            ) : (
                <Skeleton height={20} />
            )}
            {/* Logique mise à jour pour gérer les prix soldés et réguliers */}
            <div className="flex items-center justify-center gap-2 mt-3">
                {data?.salePrice ? (
                    <>
                        <BodyText size="md" className="main_clor text-center">
                            ${data.salePrice}
                        </BodyText>
                        <BodyText size="sm" className="main_clor line-through text-center" >
                            ${data.regularPrice}
                        </BodyText>
                    </>
                ) : data?.regularPrice ? (
                    <BodyText size="md" className="main_clor text-center">
                        ${data.regularPrice}
                    </BodyText>
                ) : (
                    <Skeleton height={20} width={140} />
                )}

            </div>
            <div className="mt-5">
                <MiniCart data={data} />

            </div>
        </div>
    );
};
