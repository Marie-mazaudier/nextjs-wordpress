export interface Product {
    id: string;
    productId: string;
    name: string;
    salePrice?: string;
    regularPrice?: string;
    featuredImage?: {
        node: {
            mediaItemUrl: string;
        };
    };
    slug: string;
    date: Date;
    stockStatus: string;
}
export interface PriceRange {
    priceRange: [number, number]; // Définit comme un tuple de deux nombres
}
export interface ProductCategoryProps {
    productCategories: Product[]; // C'est bien un tableau de Product
    found: number;
}

