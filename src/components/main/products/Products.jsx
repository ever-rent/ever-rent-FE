import React from "react";
import styled from "styled-components";
import { ProductsItem } from "./ProductsItem";

export const Products = () => {
  return (
    <StyledProductsContainer>
      <ProductsItem />
      <ProductsItem />
      <ProductsItem />
      <ProductsItem />
      <ProductsItem />
      <ProductsItem />
    </StyledProductsContainer>
  );
};

const StyledProductsContainer = styled.div`
  /* border: 1px solid blue; */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center; //가로방향 가운데 정렬
  /* align-items: center; */
  gap: 10px;
  /* display: flex; */
  /* flex-wrap: wrap; */
  /* margin: 20px; */
  /* justify-content: space-between; */
`;
