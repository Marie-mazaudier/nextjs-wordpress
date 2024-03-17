

export interface MarqueNode {
    slug: string;
    id: string;
    name: string;
    count: number;
    marqueId?: string; // Ajoutez cette ligne si marqueId est requis

}

export interface PostsQueryData {
    marquesProducts: {
        nodes: MarqueNode[];
    };
}