import Link from "next/link";
import React from "react";
import { Badge } from "../../../../../packages/ecommerce-ui/src/atoms/badges/Badge";
import { Placeholder } from "../../../../../packages/ecommerce-ui/src/atoms/placeholder/Placeholder";
import { BodyText } from "../../../../../packages/ecommerce-ui/src/atoms/typography/bodyText/BodyText";
import Skeleton from "react-loading-skeleton";
import Rating from "react-rating";
import { HiStar } from "react-icons/hi"; // Assurez-vous que le chemin d'importation est correct
import MiniCart from "../cartLayout/minicart";
import { useProduct } from '../../../lib/woocommerce/useProduct';

interface Product {
    id: string;
    name: string;
    salePrice?: string;
    regularPrice?: string;
    featuredImage?: {
        node: {
            mediaItemUrl: string;
        };
    };
    slug: string;
}
interface media {
    mediaItemUrl: string;
}
interface ProductCardShopProps {
    data?: Product;
}

export const ProductCardShop = ({ data }: ProductCardShopProps) => {
    // ==================Get all  products data using slug =================
    const { product, isLoading } = useProduct(data?.slug);
    console.log('product', product)
    // Calcul du pourcentage de remise si les prix de vente et réguliers sont disponibles
    const discount = data?.salePrice && data?.regularPrice
        ? ((parseFloat(data.regularPrice) - parseFloat(data.salePrice)) / parseFloat(data.regularPrice)) * 100
        : undefined;
    //  console.log('data', data)
    return (
        <div className="p-5  w-full ">
            <div className="p-4 b text-center relative flex items-center justify-center">
                {data?.featuredImage ? (
                    <Placeholder
                        className="w-full"
                        key={data.id}
                        src={data.featuredImage.node.mediaItemUrl}
                        imageWidth={350}
                        imageHeight={350}
                        alt={data.name}
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
                <Link href={`/shop/product/${data?.slug || ""}`}>
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
                <MiniCart data={product?.[0]} />

            </div>
        </div>
    );
};
