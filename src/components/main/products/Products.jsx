import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { ProductsItem } from "./ProductsItem";

import { useInView } from "react-intersection-observer";
import { base } from "../../../server/core/instance";

import { Desktop, Mobile } from "../../../Hooks/MideaQuery";

export const Products = () => {
  // infi scroll
  // 현재 state 데이터 , 다음페이지 이동 여부,
  // 현재페이지, observer 뷰 교차 여부
  const [products, setProducts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const page = useRef(1);
  const [ref, inView] = useInView(true);

  // ref로 지정한 포스트카드 최하단으로 스크롤 교차 시
  // 다음 구간 데이터 패치
  const fetch = useCallback(async () => {
    try {
      const { data } = await base.get(`/products?page=${page.current}`);
      setProducts((prevPosts) => [...prevPosts, ...data.data]);

      setHasNextPage(data.data.length === 12);
      if (data.data.length) {
        page.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // ref / scroll 교차 시 데이터 패치
  useEffect(() => {
    console.log(inView, hasNextPage);
    if (inView && hasNextPage) {
      fetch();
    }
  }, [fetch, hasNextPage, inView]);

  console.log(products);

  return (
    <>
      <Desktop>
        <StyledProductsContainer>
          <StyledProductsGrid>
            {products?.map((product) => {
              return <ProductsItem {...product} key={product.id} />;
            })}
          </StyledProductsGrid>
          <div ref={ref} style={{ position: "absolute" }} />
          {/* <div style={{position: "absolute" }} /> */}
        </StyledProductsContainer>
      </Desktop>
      {/* ################ 모바일 ################ */}
      <Mobile>
        <StyledMobileContainer>
          <StyledMobileProducts>
            {products?.map((product) => {
              return <ProductsItem {...product} key={product.id} />;
            })}
          </StyledMobileProducts>
          <div ref={ref} style={{ position: "absolute" }} />
        </StyledMobileContainer>
      </Mobile>
    </>
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
  @media only screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
  }
`;

const StyledMobileContainer = styled.div`
  /* border: 1px solid red; */
  max-width: 400px;
  margin: auto;
  margin-bottom: 90px;
  padding: 20px;
`;

const StyledMobileProducts = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;
