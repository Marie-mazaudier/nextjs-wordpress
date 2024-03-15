import Head from "next/head";
import { useState, useEffect } from "react";
import SimpleSlider from "../src/components/bannerSlider/Sliderhome";
//import { BrandData } from "../src/data/BrandData";
import { IconBoxData } from "../src/data/IconBoxData";
import { useAllFeaturedProducts } from "../lib/woocommerce/useFeaturedProducts";
import { useGetAllProducts } from "../lib/woocommerce/useProducts";
import { useRecentViewedProducts } from "../lib/woocommerce/useRecentProducts";
import { useProductCategories } from "../lib/woocommerce/useCategories";
import { useGetAllClients } from "lib/swr-wordpress/getAllClients";
import { addEmailToBrevoList } from "../lib/brevo/brevo"; // Adjust the path accordingly
import Popup from "src/components/popup/popup";
import {
  Spaces,
} from "@jstemplate/ecommerce-ui";
import client from "lib/utils/apollo-client";
//IMPORT COMPOSANTS HOME
import { PresentationSite } from "src/components/home/presentationSite";
import { TwoCategories } from "src/components/home/twoCategories";
import { RecentProducts } from "src/components/home/recentProduct";
import { PresentationBijoux } from "src/components/home/presentationBijoux";
import { InfoBijouterie } from "src/components/home/InfoBijouterie";
import { MarquesHome } from "src/components/home/MarquesHome";
import { LastPosts } from "src/components/home/LastPosts";
//IMPORT DATA GRAPHQL
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
/**/
import { SLIDERS_QUERY } from "src/data/graphQl/sliderQueries";
import { HOME_QUERY } from "src/data/graphQl/homeQueries";
import { GET_RECENT_JEWELRY_QUERY, GET_RECENT_WATCHES_QUERY } from "src/data/graphQl/woo/products/recentProducts";
import { POSTS_QUERY } from "src/data/graphQl/postQueries";
//IMPORT TYPES
import { SliderType } from "src/types/sliderType";
import { HomePageData } from "src/types/homeType";
import { Product } from "src/types/recentProductsType";
import { PostNode } from "src/types/blogCardTypes";

interface HomeProps {
  slidersData: SliderType[];
  homeData: HomePageData; // Pas besoin de tableau ici, selon votre requête GraphQL
  recentJewelry: Product[]; // Ici, recentJewelry est un tableau de produits
  recentWatches: Product[]; // Ici, recentJewelry est un tableau de produits
  recentPosts: PostNode[];
}


// Utilisez l'interface HomeProps pour typer les props de la fonction Home
export default function Home({ slidersData, homeData, recentJewelry, recentWatches, recentPosts }: HomeProps) {
  const [active, setActive] = useState(0);
  const [showPopup, setShowPopup] = useState(false);


  // ==================Get recently viewed products  data=================
  const { recentViewData } = useRecentViewedProducts(4);

  // ==================Get all featured products data=================
  const { featuredProducts } = useAllFeaturedProducts({ per_page: 8 });
  // ==================Get new arrival products  data=================
  const { products: newArrival } = useGetAllProducts({
    orderby: `date`,
    order: "asc",
  });
  // ==================Get highly rated products  data=================
  const { products: highlyRated } = useGetAllProducts({
    orderby: `rating`,
  });
  // ==================Get popular products  data=================
  const { products: popularProducts } = useGetAllProducts({
    orderby: `popularity`,
    order: "asc",
  });
  // ==================Get best selling  products  data=================
  const { products: bestSelling } = useGetAllProducts({
    orderby: `popularity`,
    order: "desc",
  });
  //================Get All client data=========================
  const [pageData, setPageData] = useState<number>(6);
  const handleClick = () => {
    setPageData(pageData + 6);
  };
  const { clients } = useGetAllClients({ per_page: pageData });

  const showingProducts =
    (active === 0 && newArrival) ||
    (active === 1 && bestSelling) ||
    (active === 2 && featuredProducts) ||
    (active === 3 && highlyRated) ||
    (active === 4 && popularProducts);

  // ==================Toutes les données produits=================
  const { products: all } = useGetAllProducts({
    orderby: `popularity`,
    order: "desc",
  });
  // ===============Categories products data ==========================
  const { productCategories } = useProductCategories();
  const dynamicTab =
    (active === 0 && all) ||
    (active === 1 && all) ||
    (active === 2 && all) ||
    (active === 3 && all) ||
    (active === 4 && all);
  //============Show popup=======================
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 500); // Délai de 3 secondes

    return () => clearTimeout(timer); // Nettoyer le timer si le composant est démonté
  }, []);

  return (
    <>
      <Head>
        <title>Home Page | Metashop</title>
        <meta name="description" content="Home page description" />
      </Head>
      <SimpleSlider sliderData={slidersData} />
      <Spaces />
      {
        showPopup && <Popup />
      }
      {/*<Presentation />*/}
      <Spaces size="xl" />
      <PresentationSite infoData={homeData.page.homeChamps.bloc1} />
      <Spaces size="xl" />
      <TwoCategories infoData={homeData.page.homeChamps.bloc2} />
      <Spaces size="xl" />
      {/*<IconBoxOne data={IconBoxData} />
      {/*<FlashSale data={featuredProducts} sectionTitle="Our Best Selling Products" />
      <Spaces />
      <MiniBanner data={miniBannerData} />
      <Spaces />
      <Spaces />
      <TrendingProducts data={showingProducts} active={active} setActive={setActive} />
      <Spaces />*/}
      <RecentProducts products={recentWatches} type="watches" />
      <Spaces size="xl" />
      <PresentationBijoux infoData={homeData.page.homeChamps.bloc3Bijoux} />
      <Spaces size="xl" />
      <RecentProducts products={recentJewelry} type="jewelry" />
      { /*<ProductCategories data={dynamicTab} category={productCategories} active={active} setActive={setActive} />
      <Spaces />
      <Brands data={clients} />*/}
      <Spaces size="xl" />
      <InfoBijouterie infoData={homeData.page.homeChamps.bloc4savoir_plus} />
      <Spaces size="xl" />
      <MarquesHome infoData={homeData.page.homeChamps.bloc5MarquesDeBijoux} />
      <Spaces size="xl" />
      <LastPosts posts={recentPosts} />
      {/*<Newsletter
        placeholder="Enter Email"
        buttonText="S'inscrire"
        backgroundImage="/image/ales-maze-z0bACVUDTJM-unsplash.jpg"
        formSubmit={addEmailToBrevoList} // Pass the function as a prop
      />

      {/*{recentViewData?.length > 0 && <RecentlyViewed title="Recently Viewed" data={recentViewData} />}
      <Spaces />*/}

    </>
  );
}

//Générer les données via SSG
export const getStaticProps = HocMenuData(async (context) => {
  const [slidersResponse, homeResponse, recentJewelryResponse, recentWatchesResponse, lastPostsResponse] = await Promise.all([
    client.query({ query: SLIDERS_QUERY }),
    client.query({ query: HOME_QUERY }),
    client.query({ query: GET_RECENT_JEWELRY_QUERY }), // Assurez-vous que cette requête est correctement importée
    client.query({ query: GET_RECENT_WATCHES_QUERY }), // Assurez-vous que cette requête est correctement importée
    client.query({ query: POSTS_QUERY }), // Assurez-vous que cette requête est correctement importée
  ]);

  const slidersData = slidersResponse.data.sliders.nodes;
  const homeData = homeResponse.data;
  // Ajustez l'accès aux données ici en fonction de la structure réelle de la réponse
  const recentJewelry = recentJewelryResponse.data.products.nodes; // Ajustement correct
  const recentWatches = recentWatchesResponse.data.products.nodes; // Ajustement correct
  const recentPosts = lastPostsResponse.data.posts.nodes; // Ajustement correct

  return {
    props: {
      slidersData,
      homeData,
      recentJewelry,
      recentWatches,
      recentPosts
    },
    revalidate: 10800, // Revalidation toutes les 3 heures comme souhaité
  };
})
