import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ProductDetails } from "../../src/components/productDescription/ProductDetails";
import { Spaces } from "@jstemplate/ecommerce-ui";
import client from "lib/utils/apollo-client";
import { GetStaticPaths, GetStaticProps } from "next";
import { ProductNode } from "src/types/productSingle";
import { useProductStock } from "../../lib/woocommerce/useProductStock";
//import GraphQL
import { SINGLE_PRODUCTS } from "src/data/graphQl/woo/products/productQueries";
import { GET_ALL_PRODUCTS_SLUGS } from "src/data/graphQl/woo/products/GetAllProductsSlugs ";
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";

interface ProductProps {
    productInfo: ProductNode;
}

const Product = ({ productInfo }: ProductProps) => {
    const router = useRouter();
    const slug = router.query.slug;

    // Assurez-vous que slug est une chaîne de caractères avant de l'utiliser
    const productSlug = Array.isArray(slug) ? slug[0] : slug;

    // Utilisez le nouveau hook useProductStock pour obtenir les informations de stock
    const { productStock, isLoading } = useProductStock(productSlug || ''); // Fournit une chaîne vide si slug est undefined

    return (
        <>
            <Head>
                <title>Single-Page | MetaShop</title>
                <meta name="description" content="single page description" />
            </Head>
            <Spaces size="mdd" />
            <ProductDetails productInfo={productInfo} isLoading={isLoading} data={productStock} />
            {/*<ProductDetails data={product} isLoading={isLoading} productInfo={productInfo} />*/}
            <Spaces size="mdd" />
            {/*<ProductDescription isLoading={isLoading} productInfo={productInfo} />*/}
            {/*recentViewData?.length > 0 && <RecentlyViewed title="Recently Viewed" data={recentViewData} />*/}
            <Spaces size="mdd" />
        </>
    );
};

export default Product;

export const getStaticProps: GetStaticProps = HocMenuData(async ({ params }) => {
    const slug = params?.slug;

    const { data } = await client.query({
        query: SINGLE_PRODUCTS,
        variables: { slug },
    });

    if (!data || !data.product) {
        return { notFound: true };
    }

    const productInfo = data.product;

    return {
        props: {
            productInfo: productInfo,
        },
        revalidate: 1800, // Toutes les 30 minutes
    };
});

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await client.query({
        query: GET_ALL_PRODUCTS_SLUGS,
    });

    const paths = data.products.edges.map(({ node }: { node: { slug: string } }) => ({
        params: { slug: node.slug },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
};