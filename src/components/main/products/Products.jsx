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
  /* border: 1px solid red; */
  display: grid;
  grid-template-columns: repeat(4, 226px);
  /* justify-items: center; //가로방향 가운데 정렬 */
  margin-top: 30px;
  gap: 50px 40px;
  @media only screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    gap: 0;
    /* margin: auto; */
    /* grid-template-columns: repeat(1, 1fr); */
    width: 100%;
  }
`;
