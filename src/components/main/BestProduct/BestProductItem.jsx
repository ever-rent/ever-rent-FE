import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { imgFirstString } from "../../../server/api";

export const BestProductItem = (item) => {
  console.log(item);
  const navigate = useNavigate();
  const {
    cateId,
    content,
    id,
    imgUrlArray,
    location,
    mapLocation,
    memberName,
    price,
    productName,
  } = item;

  return (
    <>
      <StyledItemBox>
        <StyledImgBox>
          <StyledImg
            onClick={() => {
              navigate(`/productDetail/${id}`);
            }}
            src="https://dnvefa72aowie.cloudfront.net/origin/article/202210/92F53297C5CBF171F0A87AADD70C605A72EB133C46431E88C0563F4529BAA175.jpg?q=82&s=300x300&t=crop"
            alt="이미지 없음"
          />
        </StyledImgBox>
        <StyledContentBox>
          <StyledPayBox>
            {/* <StyledTitle>{content}</StyledTitle> */}
            <StyledTitle>다이슨 청소기 싸게 빌려드립니다.</StyledTitle>
            <StyledLocation>
              {location ? location : "지역 선택 안함"}
            </StyledLocation>
            <br />
            {/* <StyledPay>{price}</StyledPay> */}
            <StyledPay>5000원</StyledPay>
            <StyledDay> / 일</StyledDay>
          </StyledPayBox>
        </StyledContentBox>
      </StyledItemBox>
    </>
  );
};

const StyledItemBox = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  padding: 15px 10px 0 10px;
`;

const StyledImgBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  /* width: 150px;
  height: 150px; */
  /* margin-bottom: 10px; */
`;

const StyledImg = styled.img`
  border-radius: 8px;
  width: 150px;
  height: 150px;
  /* padding-bottom: 10px; */
  cursor: pointer;
`;

const StyledContentBox = styled.div`
  margin: 12px 0;
`;

const StyledTitle = styled.div``;

const StyledLocation = styled.span`
  color: gray;
  font-size: 13px;
  /* font-weight: 600; */
`;

const StyledPayBox = styled.div`
  margin: 5px 0 5px 0;
  /* position: absolute;
  bottom: 0; */
`;

const StyledPay = styled.span`
  font-weight: 600;
`;

const StyledDay = styled.span`
  font-size: 13px;
`;

const StyledTimeForToday = styled.span``;
