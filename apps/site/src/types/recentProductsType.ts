export interface Product {
    id: string;
    name: string;
    salePrice?: string; // Ajouté
    regularPrice?: string; // Ajouté
    image?: {
        mediaItemUrl: string; // Mise à jour pour correspondre à la nouvelle structure
        alt?: string;
    };
    slug: string
}

export interface RecentProductsData {
    recentJewelry: Product[];
    recentWatches?: Product[]; // Optionnel pour le moment, puisque vous prévoyez de l'utiliser plus tard
}