export interface ImageNode {
    node: {
        mediaItemUrl: string;
    };
}



export interface PostNode {
    image: ImageNode
    slug: string;
    id: string;
    name: string;
    count: number;
}

export interface PostsQueryData {
    productCategories: {
        nodes: PostNode[];
    };
}