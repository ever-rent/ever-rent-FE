import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BestProductItem } from "./BestProductItem";
import { Desktop, Mobile } from "../../../Hooks/MideaQuery";
import { auth } from "../../../server/core/instance";

export const BestProducts = () => {
  const [products, setProducts] = useState([]);
  // const page = useRef(1);

  const fetch = useCallback(async () => {
    try {
      const { data } = await auth.get(`/products?page=1`);
      console.log("data.best", data.best);
      setProducts(data.best);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // const bestProducts = useSelector((store) => store.product.bestProducts);
  // console.log(bestProducts);
  const productsRef = useRef();
  // const productsBox = useRef();

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

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
    productsRef.current.style.transform = `translateX(${-idx * 212}px)`; // 180(card width)+32(gap)
  };
  console.log("BestProducts", products);

  return (
    <>
      <Desktop>
        <StyledBestProductsContainer>
          <StyledTitle>우리 동네 </StyledTitle>
          <StyledHotItem>Hot Item</StyledHotItem>
          <StyledItemAndButtonContainer>
            <StyeldMoveButtonLeft onClick={back}>
              <img
                src="https://img.icons8.com/ios/50/5923ff/back--v1.png"
                alt="<"
              />
              {/* <span>{"<"}</span> */}
            </StyeldMoveButtonLeft>
            <StyledContainer>
              <StyledGridBox ref={productsRef}>
                {products?.map((item) => {
                  return <BestProductItem item={item} key={item.id} />;
                })}
              </StyledGridBox>
            </StyledContainer>
            <StyeldMoveButtonRight onClick={forward}>
              <img
                src="https://img.icons8.com/ios/50/5923ff/forward--v1.png"
                alt=">"
              />
              {/* <span>{"<"}</span> */}
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
  width: 1013px;
  margin: auto;
`;

const StyledTitle = styled.span`
  font-size: 25px;
  font-weight: 500;
  /* color: #5923ff; */
`;

const StyledHotItem = styled.span`
  font-size: 25px;
  font-weight: 500;
  color: white;
  text-shadow:
  /* White glow */ 0 0 7px #fff, /* purple glow */ 0 0 7px #0026ff,
    0 0 10px #0026ff, 0 0 21px #0026ff;
`;

const StyledItemAndButtonContainer = styled.div`
  /* border: 1px solid black; */
  border-radius: 10px;
  display: flex;
  position: relative;
  /* max-width: 1024px; */
  /* margin: auto; */
  /* overflow: hidden; */
  padding: 0 30px;
  margin: 40px 0 100px 0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const StyeldMoveButtonLeft = styled.button`
  /* border: 1px solid red; */
  border: transparent;
  position: absolute;
  z-index: 2;
  /* font-size: 20px; */
  left: 0;
  top: 40%;
  max-width: max-content;
  background-color: transparent;
  cursor: pointer;
  /* margin-right: 20px; */
  span {
    font-size: 30px;
  }
`;

const StyeldMoveButtonRight = styled.button`
  border: transparent;
  position: absolute;
  z-index: 2;
  right: 0;
  top: 40%;
  max-width: max-content;
  background-color: transparent;
  cursor: pointer;
  margin-left: 10px;
`;

const StyledContainer = styled.div`
  /* border: 1px solid red; */
  /* height: 180px; */
  max-width: 1024px;
  margin: 25px 50px;
  padding: 10px 0 10px 16px;
  overflow: hidden;
`;

const StyledGridBox = styled.div`
  display: grid;
  z-index: 1;
  gap: 32px;
  grid-template-columns: repeat(8, 180px);
  transition: 0.6s;
`;
