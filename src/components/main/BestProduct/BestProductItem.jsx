import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { imgFirstString } from "../../../server/api";
import { timeToToday } from "../../../util/timeToToday";

export const BestProductItem = (item) => {
  const navigate = useNavigate();
  const { id, thumbimgUrl, location, price, productName, writeAt } = item.item;

  //글쓴 시간 표시.
  const [write, setWrite] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    let timeStatus = writeAt;
    timeStatus !== undefined ? setWrite(timeStatus) : (timeStatus = "");
    setCreatedAt(timeToToday(writeAt));
  }, [writeAt]);

  return (
    <>
      <StyledItemBox
        onClick={() => {
          navigate(`/productDetail/${id}`);
        }}
      >
        <StyledImgBox>
          <StyledImg
            src={`${imgFirstString}${thumbimgUrl}`}
            alt="이미지 없음"
          />
        </StyledImgBox>
        <StyledContentBox>
          <StyledTitle
            onClick={() => {
              navigate(`/productDetail/${id}`);
            }}
          >
            {productName}
          </StyledTitle>
          <StyledLocation>
            {location ? location : "지역 선택 안함"}
          </StyledLocation>
          <div>
            <StyledPay>{price}</StyledPay>
            <StyledDay> / 일</StyledDay>
          </div>
          <StyledTimeForToday> {createdAt}</StyledTimeForToday>
        </StyledContentBox>
      </StyledItemBox>
    </>
  );
};

const StyledItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 230px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    transform: scale(1.04);
  }
`;

const StyledImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: 130px;
  height: 120px;
`;

const StyledImg = styled.img`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const StyledContentBox = styled.div`
  width: 100%;
  margin: 5px 5px 7px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledTitle = styled.div`
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis; // ... 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  word-break: break-all;
  width: 150px;
  height: 20px;
  cursor: pointer;
`;

const StyledLocation = styled.span`
  color: gray;
  font-size: 13px;
`;

const StyledPay = styled.span`
  font-weight: 600;
`;

const StyledDay = styled.span`
  font-size: 13px;
`;

const StyledTimeForToday = styled.span`
  font-size: 13px;
  color: gray;
`;
