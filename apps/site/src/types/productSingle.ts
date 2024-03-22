export interface SingleProductQueryResponse {
    product: ProductNode;
}
interface mediaDetails {
    height: number;
    width: number;
    file: string;
}
interface VideoProduit {
    node: {
        mediaItemUrl: string;
    }
}
export interface ProductNode {
    id: string;
    name: string;
    slug: string;
    description?: string;
    shortDescription?: string;
    sku?: string;
    featuredImage?: {
        node: {
            mediaItemUrl: string;
            altText: "string";
            mediaDetails: mediaDetails;
        };
    };

    produitACF: {
        videoProduit: VideoProduit;
        videoPoster?: {
            node: {
                mediaItemUrl: string;
            }
        }
    }

    productId?: string;
    regularPrice?: string;
    salePrice?: string;
    onSale?: boolean;
    stockQuantity?: number;
    date?: string;
    catalogVisibility?: string;
    galleryImages?: {
        nodes: Array<{
            mediaItemUrl: string;
        }>;
    };
    terms?: {
        edges: Array<{
            node: {
                id: string;
            };
        }>;
    };
    stockStatus?: string;
    lowStockAmount?: number;
    averageRating: GLfloat;
    attributes?: {
        nodes: Array<{
            name: string;
        }>;
    };
}
