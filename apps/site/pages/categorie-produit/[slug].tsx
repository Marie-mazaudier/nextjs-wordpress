// Importations nécessaires
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from "next";
import { PROD_CAT_QUERY } from "src/data/graphQl/woo/products/productCatQueries";
import { GET_PRODUCTS_BY_CATEGORY_ID } from "src/data/graphQl/woo/products/ProductsByCatIDQueries";
import client from "lib/utils/apollo-client";
import { PostNode } from "src/types/productsCatTypes";
import { Product } from "src/types/ProductByCategoryIdTypes";
import Head from "next/head";
import { Breadcrumb } from "../../../../packages/ecommerce-ui/src";
import { Spaces } from "../../../../packages/ecommerce-ui/src";
import { BlockLayout } from "../../../../packages/ecommerce-ui/src";
import { ProductCardShop } from "../../../../packages/ecommerce-ui/src";
import { EmptyDataFound } from "src/components/emptyData/EmptyDataFound";
import { Pagination } from "../../../../packages/ecommerce-ui/src";
import { ProductFilter } from 'src/components/products/ProductFilter';
import { PageContent } from '../../../../packages/ecommerce-ui/src';
//IMPORT DATA GRAPHQL
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
interface CategoryPageProps {
    productCategories: PostNode[];
    products: Product[];
}
const CategoryPage = ({ productCategories, products }: CategoryPageProps) => {
    const productsPerPage = 20; // Nombre de produits par page
    const [currentPage, setCurrentPage] = useState(0); // Page actuelle, ReactPaginate utilise un index basé sur 0
    const [filterOpen, setFilterOpen] = React.useState(false);
    const [productActive, setProductActive] = React.useState(0);
    const [priceRange, setPriceRange] = React.useState([0, 999]);
    const router = useRouter();
    const id = router.asPath.split("/")[2];
    // Handler pour gérer le changement de page
    const handlePageChange = (selectedItem: any) => {
        setCurrentPage(selectedItem.selected);
    };
    // Filtrez ici les catégories si nécessaire, comme dans votre exemple
    const filtreCategories = productCategories?.filter((item) => item.name !== "Uncategorized");

    const filterCategories = productCategories?.filter((item: any) => item.slug == `${id}`);
    console.log('filterCategories', filterCategories)
    const totalProducts = products.length;
    // Calculer les produits à afficher en fonction de la page actuelle
    const displayedProducts = products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage);
    //console.log('displayedProducts', displayedProducts)
    return (
        <>
            <Head>
                <title>Category Page | MetaShop</title>
                <meta name="description" content="Explore our categories and find your best fit!" />
            </Head>
            {filterCategories?.map((singleData: any, index: number) => (
                <div key={index}>
                    <Breadcrumb name={`Category: ${singleData.name}`} />
                </div>
            ))}
            <Spaces size="md" />
            <BlockLayout >
                <PageContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-center">
                        {displayedProducts.map((product, index) => (
                            <ProductCardShop key={index} data={product} />
                        ))}

                    </div>
                    <Pagination
                        totalCount={totalProducts}
                        showPerPage={productsPerPage}
                        handlePageChange={handlePageChange}
                    />
                </PageContent>
                <ProductFilter
                    filterOpen={filterOpen}
                    setFilterOpen={setFilterOpen}
                    categorydata={productCategories}
                /* setPriceRange={setPriceRange}*/
                />
            </BlockLayout>
            <Spaces size="sm" />
        </>
    );
};

export const getStaticProps: GetStaticProps = HocMenuData(async ({ params }) => {

    const { slug }: any = params;
    console.log("Slug:", slug);

    const { data: categoriesData } = await client.query({ query: PROD_CAT_QUERY });
    const category = categoriesData.productCategories.nodes.find((cat: any) => cat.slug === slug);
    if (!category) {
        return { notFound: true };
    }

    const categoryId = parseInt(category.productCategoryId);
    const { data: productsData } = await client.query({
        query: GET_PRODUCTS_BY_CATEGORY_ID,
        variables: { categoryId, first: 100 }, // Ajustez ce nombre en fonction du total des produits que vous attendez
    });

    return {
        props: {
            products: productsData.products.nodes,
            productCategories: categoriesData.productCategories.nodes,
            totalProducts: productsData.products.found,
        },
        revalidate: 1800,
    };
});


export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await client.query({ query: PROD_CAT_QUERY });
    const paths = data.productCategories.nodes.map(({ slug }: any) => ({
        params: { slug },
    }));

    return { paths, fallback: 'blocking' };
};


export default CategoryPage;
