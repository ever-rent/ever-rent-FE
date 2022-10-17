import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { imgFirstString } from "../../server/api";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";
import { timeToToday } from "../../util/timeToToday";

export const MyWishItem = ({ item }) => {
  console.log("MyWishItem>>", item);
  const {
    imgUrlArray,
    price,
    productName,
    mapLocation,
    memberName,
    productWriteAt,
  } = item;

  // 글 작성 시간
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    setCreatedAt(timeToToday(productWriteAt));
  }, [productWriteAt]);

  return (
    <>
      <Desktop>
        <StyledItem>
          <img src={`${imgFirstString}${imgUrlArray[0]}`} alt="img" />
          {/* <img src={imgUrlArray[1]} alt="img" /> */}
          <div className="span-div">
            <span>
              <span className="title">{productName}</span>
              {/* <span className="writer">작성자 : {memberName}</span> */}
              <br />
              <span className="date">
                {mapLocation} ∙ {createdAt}
              </span>
            </span>
            <span>
              <StyledPay>{price}</StyledPay>
              <StyledDay> / 일</StyledDay>
            </span>
          </div>
        </StyledItem>
      </Desktop>

      <Mobile>
        <StyledMobileItem>
          <img src={`${imgFirstString}${imgUrlArray[0]}`} alt="img" />
          {/* <img src={imgUrlArray[1]} alt="img" /> */}
          <div className="span-div">
            <span>
              <span className="title">{productName}</span>
              {/* <span className="writer">작성자 : {memberName}</span> */}
              <br />
              <span className="date">
                {mapLocation} ∙ {createdAt}
              </span>
            </span>
            <span>
              <StyledPay>{price}</StyledPay>
              <StyledDay> / 일</StyledDay>
            </span>
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
    justify-content: space-around;
    .title {
      font-size: 16px;
      font-weight: 500;
    }
    .writer {
      color: gray;
      font-size: 13px;
    }
    .date {
      color: gray;
      font-size: 13px;
    }
  }
`;

const StyledPay = styled.span`
  /* border: 1px solid red; */
  font-weight: 600;
`;

const StyledDay = styled.span`
  font-size: 13px;
`;

// const StyledContentBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;

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
    justify-content: space-around;
    .title {
      font-size: 16px;
      font-weight: 500;
    }
    .writer {
      color: gray;
      font-size: 13px;
    }
    .date {
      color: gray;
      font-size: 13px;
    }
  }
`;
