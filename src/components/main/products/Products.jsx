import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { ProductsItem } from "./ProductsItem";
import { getProducts } from "../../../redux/modules/productSlice";
import { useDispatch, useSelector } from "react-redux";

import {useInView} from "react-intersection-observer";
import axios from "axios";

export const Products = () => {
  // const dispatch = useDispatch();
  // const products = useSelector((state) => state.products.products);
  // const productList = products;
  // console.log(productList);

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);


  // infi scroll
  const [products, setProducts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const page = useRef(1);
  const [ref, inView] = useInView(true);

  const fetch = useCallback(async () => {
    try {
      const { dataSet } = await axios.get(
        `https://davidpai.shop/products?_limit=12&_page=${page.current}`
      );
      const {data} = [...dataSet].data
      setProducts((prevPosts) => [...prevPosts, ...data]);
      setHasNextPage(data.length === 12);
      if (data.length) {
        page.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    console.log(inView, hasNextPage);
    if (inView && hasNextPage) {
      fetch();
    }
  }, [fetch, hasNextPage, inView]);

  console.log(products);


  return (
    <StyledProductsContainer>
      <StyledProductsGrid>
        {products?.map((product) => {
          return <ProductsItem {...product} key={product.id} />;
        })}
      </StyledProductsGrid>
      <div ref={ref} style={{ position: "absolute" }} />
      {/* <div style={{position: "absolute" }} /> */}
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
