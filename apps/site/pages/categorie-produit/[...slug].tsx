// Importations nécessaires
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from "next";
import client from "lib/utils/apollo-client";
import Head from "next/head";
import { Breadcrumb } from "../../../../packages/ecommerce-ui/src";
import { Spaces } from "../../../../packages/ecommerce-ui/src";
import { BlockLayout } from "../../../../packages/ecommerce-ui/src";
import { ProductCardShop } from "../../src/components/products/ProductCardShop";
import { EmptyDataFound } from "src/components/emptyData/EmptyDataFound";
import { Pagination } from "../../../../packages/ecommerce-ui/src";
import { ProductFilter } from 'src/components/products/ProductFilter';
import { PageContent } from '../../../../packages/ecommerce-ui/src';
import { ShopProductsWrapper } from "../../src/components/products/ShopProductsWrapper";
import { ProductHeader } from "../../src/components/products/ProductHeader";

//IMPORT DATA GRAPHQL
import { GET_PRODUCTS_BY_CATEGORY_ID } from "src/data/graphQl/woo/products/ProductsByCatIDQueries";
import { PROD_MARQUES_QUERY } from "src/data/graphQl/woo/products/productMarquesQueries";
import { PROD_CAT_QUERY } from "src/data/graphQl/woo/products/productCatQueries";
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
//IMPORT TYPES
import { PostNode } from "src/types/productsCatTypes";
import { Product } from "src/types/ProductByCategoryIdTypes";
import { MarqueNode } from "src/types/productsMarquesTypes";

interface CategoryPageProps {
    productCategories: PostNode[];
    products: Product[];
    productMarques: MarqueNode[];
    minPrice: number;
    maxPrice: number;
}
const CategoryPage = ({ productCategories, products, productMarques, minPrice, maxPrice }: CategoryPageProps) => {
    const productsPerPage = 20; // Nombre de produits par page
    const [currentPage, setCurrentPage] = useState(0); // Page actuelle, ReactPaginate utilise un index basé sur 0
    const [filterOpen, setFilterOpen] = React.useState(false);
    const [productActive, setProductActive] = React.useState(0);
    const [priceRange, setPriceRange] = React.useState<[number, number]>([minPrice, maxPrice]);
    console.log('initial price range', priceRange, minPrice, maxPrice)
    const router = useRouter();
    const id = router.asPath.split("/")[2];
    const { slug } = router.query; // Utilisez le slug directement depuis router.query
    const fullPathSlug = Array.isArray(slug) ? slug.join('/') : slug; // Joignez pour obtenir le chemin complet si nécessaire
    const [sortOption, setSortOptionState] = useState('');
    const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState<Product[]>([]);

    useEffect(() => {
        let processedProducts = [...products];

        // Filtrage par prix
        processedProducts = processedProducts.filter(product => {
            const productPrice = parseFloat(product.regularPrice ?? '0');
            return productPrice >= priceRange[0] && productPrice <= priceRange[1];
        });

        // Tri
        switch (sortOption) {
            case 'recent':
                processedProducts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                break;
            case 'price_asc':
                processedProducts.sort((a, b) => parseFloat(a.regularPrice ?? '0') - parseFloat(b.regularPrice ?? '0'));
                break;
            case 'price_desc':
                processedProducts.sort((a, b) => parseFloat(b.regularPrice ?? '0') - parseFloat(a.regularPrice ?? '0'));
                break;
        }

        // Pagination
        const startIndex = currentPage * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        setFilteredAndSortedProducts(processedProducts.slice(startIndex, endIndex));

    }, [currentPage, sortOption, priceRange, products.length]);

    const updateSortOption = (option: string) => {
        setSortOptionState(option);
        setCurrentPage(0); // Réinitialiser la page à la première lors du changement de l'option de tri
    };

    const handlePageChange = (selectedItem: any) => {
        setCurrentPage(selectedItem.selected);
    };

    const handlePriceRangeChange = (newPriceRange: [number, number]) => {
        setPriceRange(newPriceRange);
        setCurrentPage(0); // Optionnel: Réinitialiser la pagination lors du changement de la plage de prix
    };

    const filteredCategories = productCategories.filter((item) => item.count !== null && item.name !== "Non Classé");
    const filteredMarques = productMarques.filter((item) => item.count !== null && item.name !== "Non Classé");

    const currentCategory = productCategories?.filter((item: any) => item.slug == `${id}`);

    useEffect(() => {
        setPriceRange([minPrice, maxPrice]);
    }, [slug, minPrice, maxPrice]); // Ajoutez slug, minPrice, et maxPrice comme dépendances
    return (
        <>
            <Head>
                <title>Category Page | MetaShop</title>
                <meta name="description" content="Explore our categories and find your best fit!" />
            </Head>
            {currentCategory?.map((singleData: any, index: number) => (
                <div key={index}>
                    <Breadcrumb name={`Category: ${singleData.name}`} />
                </div>
            ))}
            <Spaces size="md" />
            <BlockLayout >
                <PageContent>
                    <ProductHeader
                        filterOpen={filterOpen}
                        setFilterOpen={setFilterOpen}
                        setSort={updateSortOption} // Utilisation de la nouvelle fonction updateSortOption
                        totalProductCount={products.length}
                        totalProductShow={Math.min((currentPage + 1) * productsPerPage, products.length)} // Passer un nombre directement
                    />
                    <Spaces size="xs" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-center">
                        {filteredAndSortedProducts.map((product, index) => (
                            <ProductCardShop key={index} data={product} />
                        ))}

                    </div>
                    <Pagination
                        totalCount={products.length}
                        showPerPage={productsPerPage}
                        handlePageChange={handlePageChange}
                    />
                </PageContent>
                <ProductFilter
                    filterOpen={filterOpen}
                    setFilterOpen={setFilterOpen}
                    categorydata={filteredCategories}
                    marquesdata={filteredMarques}
                    setPriceRange={setPriceRange}
                    priceRange={priceRange}
                />
            </BlockLayout>
            <Spaces size="sm" />
        </>
    );
};



export const getStaticProps: GetStaticProps = HocMenuData(async ({ params }) => {
    // Transformer le slug en chaîne, peu importe s'il vient sous forme de tableau ou de chaîne
    const slugPath = Array.isArray(params?.slug) ? params.slug.join('/') : params?.slug;

    // Récupération des catégories
    const { data: categoriesData } = await client.query({ query: PROD_CAT_QUERY });
    // Trouvez la catégorie qui correspond au dernier segment du slug, supposant que c'est le format de vos URL
    const categorySlug = slugPath?.split('/').pop();
    const category = categoriesData.productCategories.nodes.find((cat: any) => cat.slug === categorySlug);

    if (!category) {
        return { notFound: true };
    }

    // Utilisez categoryId pour la requête de produits
    const categoryId = parseInt(category.productCategoryId);
    const { data: productsData } = await client.query({
        query: GET_PRODUCTS_BY_CATEGORY_ID,
        variables: { categoryId, first: 100 },
    });

    // Récupération des marques
    const { data: marquesData } = await client.query({ query: PROD_MARQUES_QUERY });

    // Extraction et traitement des prix
    const prices = productsData.products.nodes.map((node: any) => {
        const regularPrice = parseFloat(node.regularPrice ?? '0');
        const salePrice = parseFloat(node.salePrice ?? node.regularPrice ?? '0');
        return [regularPrice, salePrice];
    }).flat().filter((price: any) => !isNaN(price));

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return {
        props: {
            products: productsData.products.nodes,
            productCategories: categoriesData.productCategories.nodes,
            productMarques: marquesData.marquesProducts.nodes,
            minPrice: isFinite(minPrice) ? minPrice : 0, // Gérer le cas où minPrice n'est pas un nombre fini
            maxPrice: isFinite(maxPrice) ? maxPrice : 0, // Gérer le cas où maxPrice n'est pas un nombre fini
        },
        revalidate: 1800,
    };
});

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await client.query({ query: PROD_CAT_QUERY });
    const paths = data.productCategories.nodes.map(({ slug }: any) => ({
        params: { slug: slug.split('/') }, // Divisez le slug en segments s'il contient des '/'
    }));

    return { paths, fallback: 'blocking' };
};



export default CategoryPage;
