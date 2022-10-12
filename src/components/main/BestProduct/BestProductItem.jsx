import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { imgFirstString } from "../../../server/api";

export const BestProductItem = (item) => {
  // console.log(item.item);
  const navigate = useNavigate();
  const {
    cateId,
    mockUrl,
    content,
    id,
    imgUrlArray,
    location,
    mapLocation,
    memberName,
    price,
    productName,
  } = item.item;

  return (
    <>
      <StyledItemBox>
        <StyledImgBox>
          <StyledImg
            onClick={() => {
              navigate(`/productDetail/${id}`);
            }}
            src={mockUrl}
            alt="이미지 없음"
          />
        </StyledImgBox>
        <StyledContentBox>
          <StyledPayBox>
            <StyledTitle>{content}</StyledTitle>
            <StyledLocation>
              {location ? location : "지역 선택 안함"}
            </StyledLocation>
            <br />
            <StyledPay>{price}</StyledPay>
            <StyledDay> / 일</StyledDay>
          </StyledPayBox>
        </StyledContentBox>
      </StyledItemBox>
    </>
  );
};

const StyledItemBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  padding: 10px 10px 0 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
