import React, { useEffect } from "react";
import styled from "styled-components";
import { ProductsItem } from "./ProductsItem";
import { getProducts } from "../../../redux/modules/productSlice";
import { useDispatch, useSelector } from "react-redux";

export const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const productList = products?.products;
  // console.log(productList);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <StyledProductsContainer>
      {productList?.map((product) => {
        return <ProductsItem {...product} key={product.id} />;
      })}
    </StyledProductsContainer>
  );
};

const StyledProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center; //가로방향 가운데 정렬
  gap: 30px 45px;
`;
