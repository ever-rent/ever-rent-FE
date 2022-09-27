import React, { useEffect } from "react";
import styled from "styled-components";
import { ProductsItem } from "./ProductsItem";
import { getProducts } from "../../../redux/modules/productSlice";
import { useDispatch, useSelector } from "react-redux";

export const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productList = products;
  // console.log(productList);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <StyledProductsContainer>
      <StyledProductsGrid>
        {productList?.map((product) => {
          return <ProductsItem {...product} key={product.id} />;
        })}
      </StyledProductsGrid>
    </StyledProductsContainer>
  );
};

const StyledProductsContainer = styled.div`
  max-width: 1024px;
  margin: 40px auto;
`;

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 226px);
  margin-top: 30px;
  gap: 50px 40px;
  @media only screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
  }
`;
