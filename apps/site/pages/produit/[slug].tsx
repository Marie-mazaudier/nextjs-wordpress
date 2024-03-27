import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ProductDetails } from "../../src/components/productDescription/ProductDetails";
import { Spaces } from "@jstemplate/ecommerce-ui";
import client from "lib/utils/apollo-client";
import { GetStaticPaths, GetStaticProps } from "next";
import { ProductNode } from "src/types/productSingle";
import { useProductStock } from "../../lib/woocommerce/useProductStock";
import { RelatedProducts } from "src/components/productDescription/relatedProducts";
import useDeleteWishlistItem from "lib/woocommerce/useDeleteWishlistItem";
import { useWishlistShareKey } from "lib/woocommerce/useWishlistShareKey";
import useWishlist from "lib/woocommerce/useWishlist";
import { useCart } from "src/CartContext";
import SignupSignin from "src/components/signupSignin/SignupSignin";

//import GraphQL
import { SINGLE_PRODUCTS } from "src/data/graphQl/woo/products/productQueries";
import { GET_ALL_PRODUCTS_SLUGS } from "src/data/graphQl/woo/products/GetAllProductsSlugs ";
import { RELATED_PRODUCTS } from "src/data/graphQl/woo/products/relatedProducts";
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
//import TYPES
import { RelatedProductNode } from "src/types/relatedProducts";
interface ProductProps {
    productInfo: ProductNode;
    relatedProducts: RelatedProductNode[];
}

const Product = ({ productInfo, relatedProducts }: ProductProps) => {
    const router = useRouter();
    const slug = router.query.slug;

    // Assurez-vous que slug est une chaîne de caractères avant de l'utiliser
    const productSlug = Array.isArray(slug) ? slug[0] : slug;

    // Utilisez le nouveau hook useProductStock pour obtenir les informations de stock
    const { productStock, isLoading } = useProductStock(productSlug || ''); // Fournit une chaîne vide si slug est undefined
    //=====Hook produits en favoris=====//
    const deleteWishlistItem = useDeleteWishlistItem();
    const { userInfo } = useCart(); // Accédez à userInfo à partir du contexte
    const isUserLoggedIn = !!userInfo; // Convertit userInfo en un booléen pour vérifier si l'utilisateur est connecté
    const [loginModalOn, setLoginModalOn] = useState(false);
    // Exécutez vos hooks conditionnellement basés sur isUserLoggedIn
    const { shareKey, isLoading: isLoadingShareKey, isError: isErrorShareKey } = useWishlistShareKey(userInfo);
    const { wishlistProducts, loading: loadingWishlist, error: errorWishlist, revalidate } = useWishlist(shareKey);

    return (
        <>
            <Head>
                <title>Single-Page | MetaShop</title>
                <meta name="description" content="single page description" />
            </Head>
            {loginModalOn && <SignupSignin setLoginModalOn={setLoginModalOn} LoginmodalOn={loginModalOn} />}
            <Spaces size="mdd" />
            <ProductDetails revalidate={revalidate} productInfo={productInfo} productId={productInfo.productId} isLoading={isLoading} data={productStock} shareKey={shareKey} wishlistProducts={wishlistProducts} setLoginModalOn={setLoginModalOn} isUserLoggedIn={isUserLoggedIn} deleteWishlistItem={deleteWishlistItem} />
            {/*<ProductDetails data={product} isLoading={isLoading} productInfo={productInfo} />*/}
            <Spaces size="xl" />
            {/*<ProductDescription isLoading={isLoading} productInfo={productInfo} />*/}
            {/*recentViewData?.length > 0 && <RecentlyViewed title="Recently Viewed" data={recentViewData} />*/}
            <RelatedProducts relatedProducts={relatedProducts} />
            <Spaces size="mdd" />
        </>
    );
};

export default Product;

export const getStaticProps: GetStaticProps = HocMenuData(async ({ params }) => {
    const slug = params?.slug;

    // Récupération des informations du produit principal
    const { data } = await client.query({
        query: SINGLE_PRODUCTS,
        variables: { slug },
    });

    if (!data || !data.product) {
        return { notFound: true };
    }
    const productInfo = data.product;

    // Récupération des produits liés
    const relatedProductsData = await client.query({
        query: RELATED_PRODUCTS,
        variables: { slug }, // Correction ici: utilisez 'slug' au lieu de 'id'
    });

    // Passez les données des produits liés en props, ainsi que les informations du produit principal
    return {
        props: {
            productInfo: productInfo,
            relatedProducts: relatedProductsData.data.product.related.nodes, // Vérifiez que ce chemin est correct
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