import React from "react";
import { Footer } from "@jstemplate/ecommerce-ui";
import { useGetCartData } from "../../../lib/coCart/getCart";
import { useProductCategories } from "../../../lib/woocommerce/useCategories";
import { AccountData, QuickLinkData, SupportData } from "../../data/FooterData";
import Navbar from "../navbar/Navbar";

const Layout = ({ children }: any) => {
  const { productCategories } = useProductCategories();
  const { data: cartData } = useGetCartData();
  const filterCategories = productCategories?.filter((item: any) => item.name != "Uncategorized");
  return (
    <>
      <Navbar category={filterCategories} cartData={cartData} className="z-[99999]" />
      <main>{children}</main>
      <Footer QuickLinkData={QuickLinkData} AccountData={AccountData} SupportData={SupportData} />
    </>
  );
};

export default Layout;
