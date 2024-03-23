export interface Product {
    productId: string;
    name: string;
    salePrice?: string; // Ajouté
    regularPrice?: string; // Ajouté
    featuredImage?: {
        node: {
            mediaItemUrl: string;
            altText?: string;
        };
    };
    slug: string
}

export interface RecentProductsData {
    recentJewelry: Product[];
    recentWatches?: Product[]; // Optionnel pour le moment, puisque vous prévoyez de l'utiliser plus tard
}