import { SINGLE_PRODUCT_STOCK } from "src/data/graphQl/woo/products/getStockSingleProduct";
import { useQuery } from "@apollo/client";
/**
 * Utiliser les données de stock d'un produit unique par son slug.
 * @param slug Slug du produit pour obtenir les données de stock.
 * @returns Les données de stock du produit, une erreur et un indicateur de chargement.
 */
export const useProductStock = (slug: string) => {
    const { data, loading, error } = useQuery(SINGLE_PRODUCT_STOCK, {
        variables: { slug },
        skip: !slug, // Ne pas exécuter la requête si le slug n'est pas défini.
    });

    const productStock = data?.product ? {
        name: data.product.name,
        productId: data.product.productId,
        regularPrice: data.product.regularPrice,
        salePrice: data.product.salePrice,
        stockQuantity: data.product.stockQuantity,
        stockStatus: data.product.stockStatus,
        lowStockAmount: data.product.lowStockAmount,
    } : null;

    return {
        productStock,
        isLoading: loading,
        isError: error
    };
};