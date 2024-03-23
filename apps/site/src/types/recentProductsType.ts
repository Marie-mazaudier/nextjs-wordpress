export interface Product {
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

export interface RecentProductsData {
    recentJewelry: Product[];
    recentWatches?: Product[]; // Optionnel pour le moment, puisque vous prévoyez de l'utiliser plus tard
}