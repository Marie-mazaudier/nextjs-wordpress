import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useProduct } from "../../lib/woocommerce/useProduct";
import { getRecentlyViewed } from "../../src/utils/products.utils";
import { ProductDetails } from "../../src/components/productDescription/ProductDetails";
import { Spaces } from "@jstemplate/ecommerce-ui";
import client from "lib/utils/apollo-client";
import { GetStaticProps } from "next";
//IMPORT TYPE
import { ProductNode } from "src/types/productSingle";
//IMPORT DATA GRAPHQL
import { SINGLE_PRODUCTS } from "src/data/graphQl/woo/products/productQueries";
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
interface ProductProps {
    productInfo: ProductNode;
}
const Product = ({ productInfo }: ProductProps) => {
    const router = useRouter();
    const slug = router?.query?.slug;
    // ==================Get all  products data using slug =================
    const { product, isLoading } = useProduct(slug);

    // ==================Get all recently viewed products data=================
    // const { recentViewData } = useRecentViewedProducts(4);
    // console.log(product)
    if (product[0]?.id) {
        getRecentlyViewed(product[0]?.id);
    }
    //   console.log('valeur initial product Info', productInfo)
    return (
        <>
            <Head>
                <title>Single-Page | MetaShop</title>
                <meta name="description" content="single page description" />
            </Head>
            <Spaces size="mdd" />
            <ProductDetails data={product} isLoading={isLoading} productInfo={productInfo} />
            <Spaces size="mdd" />
            {/*<ProductDescription isLoading={isLoading} productInfo={productInfo} />*/}
            {/*recentViewData?.length > 0 && <RecentlyViewed title="Recently Viewed" data={recentViewData} />*/}
        </>
    );
};

export default Product;

export const getStaticProps: GetStaticProps = HocMenuData(async ({ params }) => {
    const slug = params?.slug; // Obtenir le slug à partir des params

    const { data } = await client.query({
        query: SINGLE_PRODUCTS,
        variables: { slug }, // Passer le slug directement sans le mettre dans un tableau
    });

    if (!data || !data.product) {
        return { notFound: true };
    }

    const productInfo = data.product;

    return {
        props: {
            productInfo: productInfo,
        },
        revalidate: 900,
    };
});

export async function getStaticPaths() {
    // Pas de chemin prégénéré, gestion dynamique des slugs produits
    return { paths: [], fallback: 'blocking' };
}