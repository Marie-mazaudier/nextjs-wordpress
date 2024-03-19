import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_STOCK } from "src/data/graphQl/woo/products/GetProductsStock";

export const useGetProductsStock = (perPage: number, after: string | null) => {
    const { loading, error, data } = useQuery(GET_PRODUCTS_STOCK, {
        variables: {
            perPage,
            after,
        },
    });

    // Map the products to include a transformation where `productId` is treated as `id`
    const products = data?.products.edges.map(({ node }: any) => ({
        ...node,
        id: node.productId, // Assigning productId to id
    })) || [];

    return {
        loading,
        error,
        products,
        pageInfo: data?.products.pageInfo,
    };
};