import React, { useState, useEffect } from 'react';
import Head from "next/head";
import { ProductFilter } from "../../src/components/products/ProductFilter";
import { ProductHeader } from "../../src/components/products/ProductHeader";
import { ProductCardShop } from "../../src/components/products/ProductCardShop";
import client from "lib/utils/apollo-client";
//IMPORT DATA GRAPHQL
import { GET_ALL_PRODUCTS } from "src/data/graphQl/woo/products/allProducts";
import { PROD_MARQUES_QUERY } from "src/data/graphQl/woo/products/productMarquesQueries";
import { PROD_CAT_QUERY } from "src/data/graphQl/woo/products/productCatQueries";
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
//IMPORT TYPES
import { PostNode } from "src/types/productsCatTypes";
import { Product } from "src/types/ProductByCategoryIdTypes";
import { MarqueNode } from "src/types/productsMarquesTypes";
import {
    BlockLayout,
    Brands,
    HorizontalLine,
    PageContent,
    Breadcrumb,
    RecentlyViewed,
    Spaces,
    Pagination,
} from "@jstemplate/ecommerce-ui";

interface ShopRightSidebarProps {
    productCategories: PostNode[];
    products: Product[];
    productMarques: MarqueNode[];
    minPrice: number;
    maxPrice: number;
}
const ShopRightSidebar = ({ productCategories, products, productMarques, minPrice, maxPrice }: ShopRightSidebarProps) => {
    const productsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(0);
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOption, setSortOptionState] = useState('');
    const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
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
    return (
        <>
            <Head>
                <title>Shop Right Sidebar | MetaShop</title>
                <meta name="description" content="Shop Right Sidebar Page description" />
            </Head>
            <Breadcrumb />
            <Spaces size="md" />
            <BlockLayout>
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
                    categorydata={productCategories}
                    marquesdata={productMarques}
                    setPriceRange={setPriceRange}
                    priceRange={[minPrice, maxPrice]}
                />
            </BlockLayout>
            <Spaces size="sm" />
        </>
    );
};
export default ShopRightSidebar;



export const getStaticProps = HocMenuData(async (context) => {

    // console.log("Slug:", slug);

    const { data: categoriesData } = await client.query({ query: PROD_CAT_QUERY });

    const { data: productsData } = await client.query({
        query: GET_ALL_PRODUCTS,
    });
    //récupérer la liste des marques
    const { data: marquesData } = await client.query({ query: PROD_MARQUES_QUERY });

    // Extraction et traitement correct des prix en suivant la structure products -> edges -> node
    const prices = productsData.products.edges.map(({ node }: any) => {
        const regularPrice = parseFloat(node.regularPrice ?? '0');
        const salePrice = parseFloat(node.salePrice ?? node.regularPrice ?? '0');
        return [regularPrice, salePrice];
    }).flat().filter((price: any) => !isNaN(price));

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return {
        props: {
            products: productsData.products.edges.map(({ node }: any) => node), // Correction ici pour utiliser la structure correcte
            productCategories: categoriesData.productCategories.nodes,
            productMarques: marquesData.marquesProducts.nodes,
            minPrice,
            maxPrice,
        },
        revalidate: 1800,
    };
});