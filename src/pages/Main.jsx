import React from "react";
import { Layout } from "../components/layout/Layout";
import { CategoryBox } from "../components/category/CategoryBox";
import { Products } from "../components/main/products/Products";

export const Main = () => {
  return (
    <Layout>
      <CategoryBox />
      <Products />
    </Layout>
  );
};
