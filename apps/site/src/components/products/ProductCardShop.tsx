import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Badge } from "../../../../../packages/ecommerce-ui/src/atoms/badges/Badge";
import { Placeholder } from "../../../../../packages/ecommerce-ui/src/atoms/placeholder/Placeholder";
import { BodyText } from "../../../../../packages/ecommerce-ui/src/atoms/typography/bodyText/BodyText";
import Skeleton from "react-loading-skeleton";
import MiniCart from "../cartLayout/minicart";
import { RiHeart2Line } from "react-icons/ri";
//import { useWishlistShareKey } from "lib/woocommerce/useWishlistShareKey";
import { addProductToWishlist } from "lib/woocommerce/useAddToWishlist";
//import { useProduct } from '../../../lib/woocommerce/useProduct';

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
    stockStatus: string;
}
interface media {
    mediaItemUrl: string;
}
interface stockData {
    id: string;
    stock: number;
}
interface ProductCardShopProps {
    data: Product;
    stockProductsData?: stockData;
    stockProductsLoading?: boolean;
    shareKey?: string; // Ajout de shareKey comme prop optionnelle
    wishlistProducts?: any[]; // Typage à ajuster selon vos besoins
}

export const ProductCardShop = ({ data, shareKey, wishlistProducts }: ProductCardShopProps) => {

    const [isOutOfStock, setIsOutOfStock] = useState(data?.stockStatus === "OUT_OF_STOCK");
    const [isInCart, setisInCart] = useState(false);
    const isProductInWishlist = wishlistProducts?.some(wishlistProduct => wishlistProduct.product_id === data.id);

    const productId = data.id // L'ID du produit à ajouter
    // Lorsqu'un utilisateur clique sur le bouton d'ajout à la wishlist
    const handleAddToWishlistClick = async () => {
        if (shareKey) {
            try {
                const result = await addProductToWishlist(shareKey, productId);
                //  console.log('Product added to wishlist successfully:', result);
            } catch (error) {
                // console.error('Error adding product to wishlist:', error);
            }
        }
    };

    //  console.log('wishlistProducts', wishlistProducts)
    //Appel de la fonction si stock out => mise à jour des info du produit
    const handleStockOut = () => setIsOutOfStock(true);
    const handleIsInCart = () => setisInCart(true)
    // Calcul du pourcentage de remise si les prix de vente et réguliers sont disponibles
    const discount = data?.salePrice && data?.regularPrice
        ? ((parseFloat(data.regularPrice) - parseFloat(data.salePrice)) / parseFloat(data.regularPrice)) * 100
        : undefined;
    //  console.log('data', data)
    //  const stockOut = data?.stockStatus === "OUT_OF_STOCK";

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
                        <BodyText size="sm" className="main_clor line-through text-center">
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
                {isOutOfStock && (
                    <BodyText size="md" className="text-center uppercase">
                        Vendu
                    </BodyText>
                )}
            </div>
            <div className="mt-5 flex items-center justify-center">
                <MiniCart data={data} onStockOut={handleStockOut} isOutOfStock={isOutOfStock} isInCart={isInCart} handleIsInCart={handleIsInCart} />
                <RiHeart2Line onClick={handleAddToWishlistClick} />
                {/* Exemple d'utilisation */}
                {isProductInWishlist && (
                    <span className="wishlist-indicator">En favoris</span>
                )}
            </div>
            {/*isInCart && (
                <BodyText size="md" className="text-center uppercase">
                    Article ajouté au panier
                </BodyText>
            )*/}
        </div>
    );
};
