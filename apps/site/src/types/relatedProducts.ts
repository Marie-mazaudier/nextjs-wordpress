// TypeScript interfaces for related products query response
export interface RelatedProductNode {
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

export interface RelatedProductsData {
    related: {
        nodes: RelatedProductNode[];
    }
}

export interface RelatedProductsResponse {
    product: RelatedProductsData;
}
