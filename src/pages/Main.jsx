import React from "react";
import { Layout } from "../components/layout/Layout";
import { Products } from "../components/main/products/Products";

export const Main = () => {
  return (
    <Layout>
      <h1>Main</h1>
      <Products />
    </Layout>
  );
};
