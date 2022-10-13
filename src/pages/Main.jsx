import React from "react";
import { Layout } from "../components/layout/Layout";
import { CategoryBox } from "../components/category/CategoryBox";
import { Products } from "../components/main/products/Products";
import { SideNav } from "./SideNav";
import { useSelector } from "react-redux";
import { Banner } from "../components/main/Banner";
import { BestProducts } from "../components/main/BestProduct/BestProducts";
import { SlideShow } from "../components/main/BestProduct/SlideShow";

export const Main = () => {
  const { openState } = useSelector((state) => state.nav);

  return (
    <Layout>
      <Banner />
      <SideNav openState={openState} />
      <CategoryBox />
      {/* <BestProducts /> */}
      {/* <SlideShow /> */}
      <Products />
    </Layout>
  );
};
