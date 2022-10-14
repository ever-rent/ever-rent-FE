import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { ProductsItem } from "./ProductsItem";
import { Skeleton } from "../../skeleton/Skeleton";
import { useInView } from "react-intersection-observer";
import { base } from "../../../server/core/instance";
import { auth } from "../../../server/core/instance";

import { Desktop, Mobile } from "../../../Hooks/MideaQuery";
import { BestProducts } from "../BestProduct/BestProducts";

export const Products = () => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);
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
      const { data } = await auth.get(`/products?page=${page.current}`);
      console.log(data);
      setProducts((prevPosts) => [...prevPosts, ...data.data]);
      setHasNextPage(data.data.length === 12);
      if (data.data.length) {
        page.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // console.log(products);
  // ref / scroll 교차 시 데이터 패치
  useEffect(() => {
    setIsLoading(true);
    console.log(inView, hasNextPage);
    if (inView && hasNextPage) {
      setTimeout(() => {
        fetch();
      }, 700);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [fetch, hasNextPage, inView]);

  console.log(products);

  return (
    <>
      <Desktop>
        <BestProducts />
        <StyledProductsContainer>
          <StyledProductsGrid>
            {products?.map((product) => {
              return <ProductsItem {...product} key={product.id} />;
            })}
          </StyledProductsGrid>

          {isLoading === true ? (
            <>
              <Skeleton />
              <StyledSpinner>
                <span className="spinner"></span>
              </StyledSpinner>
            </>
          ) : null}
          <div ref={ref} style={{ position: "relative" }} />
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
          <div ref={ref} style={{ position: "relative" }} />
          {isLoading === true ? (
            <>
              <Skeleton />
              <StyledSpinner>
                <span className="spinner"></span>
              </StyledSpinner>
            </>
          ) : null}
        </StyledMobileContainer>
      </Mobile>
    </>
  );
};

const StyledProductsContainer = styled.div`
  max-width: 1024px;
  margin: 40px auto;
  position: relative;
`;

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 226px);
  margin-top: 30px;
  gap: 50px 40px;
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

const StyledSpinner = styled.div`
  /* display: none; */
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  & .spinner {
    box-sizing: border-box;
    position: fixed;
    bottom: 200px;
    left: 50%;
    width: 64px;
    height: 64px;
    margin-top: -32px;
    margin-left: -32px;
    border-radius: 50%;
    border: 8px solid transparent;
    border-top-color: rgb(71, 181, 255);
    border-bottom-color: rgb(71, 181, 255);
    animation: spinner 0.7s ease infinite;

    @keyframes spinner {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;
