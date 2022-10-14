import React from "react";
import styled from "styled-components";
import { imgFirstString } from "../../server/api";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";

export const MyWishItem = ({ item }) => {
  console.log(item);
  const { imgUrlArray, price, productName } = item;
  return (
    <>
      <Desktop>
        <StyledItem>
          <img src={`${imgFirstString}${imgUrlArray[0]}`} alt="img" />
          {/* <img src={imgUrlArray[1]} alt="img" /> */}
          <div className="span-div">
            <span className="title"> 상품명 : {productName}</span>
            <span> 가격 : {price}</span>
            {/* <span>
          남은 기간 : <span className="date">3일</span>
        </span> */}
          </div>
        </StyledItem>
      </Desktop>
      <Mobile>
        <StyledMobileItem>
          <img src={`${imgFirstString}${imgUrlArray[0]}`} alt="img" />
          {/* <img src={imgUrlArray[1]} alt="img" /> */}
          <div className="span-div">
            <span className="title"> 상품명 : {productName}</span>
            <span> 가격 : {price}</span>
            {/* <span>
          남은 기간 : <span className="date">3일</span>
        </span> */}
          </div>
        </StyledMobileItem>
      </Mobile>
    </>
  );
};

const StyledItem = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  padding: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .like {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 30px;
    cursor: pointer;
  }
  img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  .span-div {
    display: flex;
    flex-direction: column;
    .title {
      color: #999;
      font-size: 12px;
    }
    .date {
      color: red;
      font-weight: bold;
    }
  }
`;

const StyledMobileItem = styled.div`
  display: flex;
  max-width: 460px;
  position: relative;
  padding: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .like {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 30px;
    cursor: pointer;
  }
  img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  .span-div {
    display: flex;
    flex-direction: column;
    .title {
      color: #999;
      font-size: 12px;
    }
    .date {
      color: red;
      font-weight: bold;
    }
  }
`;
