export interface Product {
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

export interface ProductCategoryProps {
    productCategories: Product[]; // Assurez-vous que c'est un tableau de Product
    found: number;

}
