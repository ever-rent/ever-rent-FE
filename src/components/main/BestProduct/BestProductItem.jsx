import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { imgFirstString } from "../../../server/api";
import { timeToToday } from "../../../util/timeToToday";

export const BestProductItem = (item) => {
  // console.log(item.item);
  const navigate = useNavigate();
  const {
    cateId,
    heart,
    id,
    thumbimgUrl,
    location,
    mapLocation,
    memberName,
    price,
    productName,
    status,
    wishNum,
    writeAt,
  } = item.item;

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
      <StyledItemBox>
        <StyledImgBox>
          <StyledImg
            onClick={() => {
              navigate(`/productDetail/${id}`);
            }}
            src={`${imgFirstString}${thumbimgUrl}`}
            alt="이미지 없음"
          />
        </StyledImgBox>
        <StyledContentBox>
          {/* <StyledPayBox> */}
          <StyledTitle>{productName}</StyledTitle>
          <StyledLocation>
            {location ? location : "지역 선택 안함"}
          </StyledLocation>
          <div>
            <StyledPay>{price}</StyledPay>
            <StyledDay> / 일</StyledDay>
          </div>
          <StyledTimeForToday> {createdAt}</StyledTimeForToday>
          {/* </StyledPayBox> */}
        </StyledContentBox>
      </StyledItemBox>
    </>
  );
};

const StyledItemBox = styled.div`
  /* border: 1px solid green; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 230px;
  /* padding: 10px 10px 0 10px; */
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const StyledImgBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 2px; */
  margin-top: 10px;
  width: 130px;
  height: 120px;
  object-fit: cover;
`;

const StyledImg = styled.img`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  /* padding-bottom: 10px; */
  cursor: pointer;
`;

const StyledContentBox = styled.div`
  width: 100%;
  /* margin: 12px 0; */
  margin: 5px 5px 7px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* position: absolute;
  bottom: 0; */
`;

const StyledTitle = styled.div`
  /* border: 1px solid red; */
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis; // ... 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  word-break: break-all;
  width: 150px;
  height: 20px;
`;

const StyledLocation = styled.span`
  color: gray;
  font-size: 13px;
  /* font-weight: 600; */
`;

const StyledPayBox = styled.div``;

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
