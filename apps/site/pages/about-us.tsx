import React from "react";
import Head from "next/head";
import { IconBoxData } from "../src/data/IconBoxData";
import { AboutUsBanner, Brands, BreadcrumbTwo, IconBoxOne, OurOffer, OurTeam, Spaces } from "@jstemplate/ecommerce-ui";

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About-Us page | MetaShop</title>
        <meta name="description" content="About-Us page description" />
      </Head>
      <BreadcrumbTwo />
      <Spaces />
      <AboutUsBanner />
      <Spaces />
      <IconBoxOne data={IconBoxData} />
      <Spaces />
      <OurTeam />
      <Spaces />
      <OurOffer />
      <Spaces />
    </>
  );
};

export default AboutUs;
