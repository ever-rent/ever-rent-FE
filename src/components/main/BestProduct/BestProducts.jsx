import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BestProductItem } from "./BestProductItem";
import { Desktop, Mobile } from "../../../Hooks/MideaQuery";
import { auth } from "../../../server/core/instance";

export const BestProducts = () => {
  const [products, setProducts] = useState([]);

  const fetch = useCallback(async () => {
    try {
      const { data } = await auth.get(`/products?page=1`);
      console.log("data.best", data.best);
      const filteredProducts = data.best.filter(
        (item) => item.status !== "EXPIRATION"
      );
      setProducts(filteredProducts);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const productsRef = useRef();

  useEffect(() => {
    fetch();
  }, []);

  //찜 많은 순으로 상품 나열하는 slide 구현

  //상품 index 배열 만들기
  const makeArr = (bestProducts) => {
    let arr = [];
    bestProducts?.map((_, idx) => arr.push(idx)); //map 요소(element, index, arr)
    console.log("arr", arr);
    return arr;
  };

  // cf) best 상품 개수: 8개
  const idxArr = makeArr(products); //idxArr=[0,1,2,3,4,5,6,7]

  let idx = 0;

  const back = () => {
    const forwardIdx = idxArr[--idx];
    console.log("back >> forwardIdx", forwardIdx);
    console.log("back >> idx", idx);
    if (forwardIdx === undefined) {
      idx = 0;
      return;
    }
    move(forwardIdx);
  };

  const forward = () => {
    // 한페이지에 보이는 아이템 수: 4
    if (idx === 4) {
      return;
    } else {
      let backIdx = idxArr[++idx];
      console.log("forward >> idx", idx);
      console.log("forward >> backIdx", backIdx);
      move(backIdx);
    }
  };

  const move = (idx) => {
    productsRef.current.style.transform = `translateX(${-idx * 182}px)`; // 180(card width)+32(gap)
  };
  console.log("BestProducts", products);

  return (
    <>
      <Desktop>
        <StyledBestProductsContainer>
          <StyledHotItem>Hot Item</StyledHotItem>
          <StyledItemAndButtonContainer>
            <StyeldMoveButtonLeft onClick={back}>
              <span className="sign">{"<"}</span>
            </StyeldMoveButtonLeft>
            <StyledContainer>
              <StyledGridBox ref={productsRef}>
                {products?.map((item) => {
                  return <BestProductItem item={item} key={item.id} />;
                })}
              </StyledGridBox>
            </StyledContainer>
            <StyeldMoveButtonRight onClick={forward}>
              <span className="sign">{">"}</span>
            </StyeldMoveButtonRight>
          </StyledItemAndButtonContainer>
        </StyledBestProductsContainer>
      </Desktop>

      <Mobile>
        <></>
      </Mobile>
    </>
  );
};

const StyledBestProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 850px;
  height: 100%;
  margin: auto;
  padding: 0 10px 30px 10px;
`;

const StyledHotItem = styled.span`
  padding-bottom: 15px;
  font-size: 25px;
  font-weight: 500;
  color: white;
  text-shadow:
  /* White glow */ 0 0 7px #fff, /* purple glow */ 0 0 7px #0026ff,
    0 0 10px #0026ff, 0 0 21px #0026ff;
`;

const StyledItemAndButtonContainer = styled.div`
  display: flex;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  position: relative;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const StyeldMoveButtonLeft = styled.button`
  border: transparent;
  position: absolute;
  z-index: 3;
  left: 0px;
  top: 35%;
  max-width: max-content;
  background-color: transparent;
  cursor: pointer;
  .disabled {
    color: #98d1f7;
  }
  span {
    color: #47b5ff;
    font-size: 45px;
    font-weight: 400;
    transition: 0.1s;
    &:hover {
      font-size: 50px;
    }
  }
`;

const StyeldMoveButtonRight = styled.button`
  border: transparent;
  position: absolute;
  z-index: 2;
  right: 0px;
  top: 35%;
  max-width: max-content;
  background-color: transparent;
  cursor: pointer;
  margin-left: 10px;
  span {
    color: #47b5ff;
    font-size: 45px;
    font-weight: 400;
    transition: 0.1s;
    &:hover {
      font-size: 50px;
    }
  }
`;

const StyledContainer = styled.div`
  width: 712px;
  padding: 15px 0 15px 16px;
  overflow: hidden;
`;

const StyledGridBox = styled.div`
  display: grid;
  z-index: 1;
  gap: 32px;
  grid-template-columns: repeat(8, 150px);
  height: 230px;
  transition: 0.6s;
`;
