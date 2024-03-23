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
import { Pagination } from "../../../../packages/ecommerce-ui/src";
import { ProductFilter } from 'src/components/products/ProductFilter';
import { PageContent } from '../../../../packages/ecommerce-ui/src';
import { ProductHeader } from "../../src/components/products/ProductHeader";

//IMPORT DATA GRAPHQL
import { PROD_MARQUES_QUERY } from "src/data/graphQl/woo/products/productMarquesQueries";
import { GET_PRODUCTS_BY_MARQUE_SLUG } from "src/data/graphQl/woo/products/ProductsByMarques";
import { PROD_CAT_QUERY } from "src/data/graphQl/woo/products/productCatQueries";
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
//IMPORT TYPES
import { PostNode } from "src/types/productsCatTypes";
import { MarqueNode } from "src/types/productsMarquesTypes";
import { Product } from "src/types/ProductByCategoryIdTypes";

interface MarquesPageProps {
    productMarques: MarqueNode[];
    products: Product[];
    categories: PostNode[];
    minPrice: number;
    maxPrice: number;
}
const MarquesPage = ({ productMarques, products, categories, minPrice, maxPrice }: MarquesPageProps) => {
    const productsPerPage = 20; // Nombre de produits par page
    const [currentPage, setCurrentPage] = useState(0); // Page actuelle, ReactPaginate utilise un index basé sur 0
    const [filterOpen, setFilterOpen] = React.useState(false);
    const [productActive, setProductActive] = React.useState(0);
    const [priceRange, setPriceRange] = React.useState<[number, number]>([minPrice, maxPrice]);
    //  console.log('initial price range', priceRange, minPrice, maxPrice)
    const router = useRouter();
    const id = router.asPath.split("/")[2];
    const { slug } = router.query; // Utilisez le slug directement depuis router.query
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

    // Filtrez ici les catégories si nécessaire, comme dans votre exemple
    const filteredMarques = productMarques.filter((item) => item.count !== null && item.name !== "Non Classé");
    const filteredCategories = categories.filter((item) => item.count !== null && item.name !== "Non Classé");

    const currentCategory = productMarques?.filter((item: any) => item.slug == `${id}`);
    // Réinitialiser priceRange lorsque le slug change
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
    const { slug }: any = params;
    const { data: marquesData } = await client.query({ query: PROD_MARQUES_QUERY });

    // Trouver la marque correspondant au slug
    const marque = marquesData.marquesProducts.nodes.find((node: any) => node.slug === slug);

    if (!marque) {
        return { notFound: true };
    }
    // Utilisez le slug de la marque pour récupérer les produits associés
    const { data: productsData } = await client.query({
        query: GET_PRODUCTS_BY_MARQUE_SLUG,
        variables: { slug, first: 100 }, // Utilisez le slug comme variable ici
    });
    //récupérer les catégories pour les filtres
    const { data: categoriesData } = await client.query({ query: PROD_CAT_QUERY });
    // Extraction et traitement des prix
    const prices = productsData.products.edges.flatMap(({ node }: any) => {
        const regularPrice = parseFloat(node.regularPrice ?? '0');
        const salePrice = parseFloat(node.salePrice ?? node.regularPrice ?? '0'); // Utilise salePrice s'il est disponible, sinon regularPrice
        return [regularPrice, salePrice]; // Retourne les deux pour considérer les deux types de prix
    }).filter((price: any) => !isNaN(price)); // Filtre les valeurs non numériques

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    // Transformation des produits pour que `id` soit égal à `productId`
    const transformedProducts = productsData.products.edges.map(({ node }: any) => ({
        ...node, // On conserve toutes les propriétés existantes du produit
        id: node.productId, // On ajoute ou écrase la propriété `id` avec la valeur de `productId`
    }));


    return {
        props: {
            products: transformedProducts, // Utilisation des produits transformés
            productMarques: marquesData.marquesProducts.nodes,
            totalProducts: productsData.products.edges.length, // Mise à jour en fonction de la structure de réponse
            categories: categoriesData.productCategories.nodes,
            minPrice,
            maxPrice,
        },
        revalidate: 900, // toutes les 15 minutes
    };
});




export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await client.query({ query: PROD_MARQUES_QUERY });

    // Générer des chemins pour chaque catégorie, en tenant compte des structures potentiellement hiérarchiques
    const paths = data.marquesProducts.nodes.map(({ slug }: any) => ({
        params: { slug: slug.includes('/') ? slug.split('/') : [slug] }, // Divise les slugs en segments si nécessaire
    }));

    return { paths, fallback: 'blocking' };
};

export default MarquesPage;
