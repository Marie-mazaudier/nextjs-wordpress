import Head from "next/head";
import { useState, useEffect } from "react";
import SimpleSlider from "../src/components/bannerSlider/Sliderhome";
import { miniBannerData } from "../src/data/BannerData";
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
  Presentation,
  Newsletter,
  IconBoxOne,
  FlashSale,
  MiniBanner,
  TrendingProducts,
  ProductCategories,
  RecentlyViewed,
  Brands,
  Spaces,
} from "@jstemplate/ecommerce-ui";

export default function Home() {
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
      <SimpleSlider className="z-10" />
      <Spaces />
      {
        showPopup && <div className={`fixed inset-0 z-50 transition-opacity duration-500 ease-in ${showPopup ? 'opacity-100' : 'opacity-0'}`}>
          <Popup />
        </div>
      }
      <Presentation />
      <Spaces />
      <IconBoxOne data={IconBoxData} />
      <Spaces />
      {/*<FlashSale data={featuredProducts} sectionTitle="Our Best Selling Products" />
      <Spaces />
      <MiniBanner data={miniBannerData} />
      <Spaces />
      <TrendingProducts data={showingProducts} active={active} setActive={setActive} />
  <Spaces />*/}
      <ProductCategories data={dynamicTab} category={productCategories} active={active} setActive={setActive} />
      <Spaces />
      <Brands data={clients} />
      <Spaces />
      <Newsletter
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
