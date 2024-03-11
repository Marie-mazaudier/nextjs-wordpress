export interface FeaturedImageNode {
    mediaItemUrl: string;
}

export interface FeaturedImage {
    node: FeaturedImageNode;
}

export interface CategoryNode {
    name: string;
    slug: string;
}

export interface Categories {
    nodes: CategoryNode[];
}

export interface PostNode {
    title: string;
    featuredImage: FeaturedImage;
    excerpt: string;
    date: string;
    categories: Categories;
    slug: string;
}

export interface PostsData {
    posts: {
        nodes: PostNode[];
    };
}