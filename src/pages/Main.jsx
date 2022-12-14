import React from "react";
import { Layout } from "../components/layout/Layout";
import { CategoryBox } from "../components/category/CategoryBox";
import { Products } from "../components/main/products/Products";
import { SideNav } from "./SideNav";
import { useSelector } from "react-redux";
import { Banner } from "../components/main/Banner";
import { SlideShow } from "../components/main/SlideShow";

export const Main = () => {
  const { openState } = useSelector((state) => state.nav);

  return (
    <Layout>
      <Banner />
      <SideNav openState={openState} />
      <CategoryBox />
      <SlideShow />
      <Products />
    </Layout>
  );
};
