import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { timeToToday } from "../../../util/timeToToday";
import { imgFirstString } from "../../../server/api";
import { Desktop, Mobile } from "../../../Hooks/MideaQuery";

export const ProductsItem = ({
  id,
  productName,
  memberName,
  price,
  address,
  wishNum,
  chat,
  content,
  writeAt,
  cateId,
  location,
  status,
  heart,
  thumbimgUrl,
}) => {
  const navigate = useNavigate();

  //상품 status
  const presentStatus = (status) => {
    if (status === "WAITING") {
      return <StyledWaiting></StyledWaiting>;
    } else if (status === "CONFIRMATION") {
      return <StyledStatus>렌탈확정</StyledStatus>;
    } else if (status === "EXPIRATION") {
      return <StyledStatus>기한만료</StyledStatus>;
    }
  };

  //글쓴 시간 표시.

  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    setCreatedAt(timeToToday(writeAt));
  }, [writeAt]);

  return (
    <>
      <Desktop>
        <StyledItemBox
          onClick={() => {
            navigate(`/productDetail/${id}`);
          }}
          style={status === "EXPIRATION" ? { opacity: 0.5 } : null}
        >
          <StyledImgBox>
            <StyledImg
              src={`${imgFirstString}${thumbimgUrl}`}
              alt="이미지 없음"
            />
          </StyledImgBox>
          <StyledContentBox>
            <StyledTitle>{productName}</StyledTitle>
            <StyledLocation>
              {location ? location : "지역 선택 안함"}
            </StyledLocation>
            {presentStatus(status)}
            <StyledPayBox>
              <StyledPay>{price}</StyledPay>
              <StyledDay> / 일</StyledDay>
              <br />
              <StyledTimeForToday> {createdAt}</StyledTimeForToday>
            </StyledPayBox>
            <StyledLikeAndChatBox>
              <StyledLikeWrap>
                <StyledLike
                  src="https://img.icons8.com/ios/50/737373/like--v1.png"
                  alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
                />
                <span>{wishNum}</span>
              </StyledLikeWrap>
            </StyledLikeAndChatBox>
          </StyledContentBox>
        </StyledItemBox>
      </Desktop>
      {/* ################ 모바일 ################ */}
      <Mobile>
        <StyledMobileItemBox
          onClick={() => {
            navigate(`/productDetail/${id}`);
          }}
          style={status === "EXPIRATION" ? { opacity: 0.5 } : null}
        >
          <StyledMobileImgBox>
            <StyledImg
              src={`${imgFirstString}${thumbimgUrl}`}
              alt="이미지 없음"
            />
          </StyledMobileImgBox>
          <StyledMobileContentBox>
            <StyledMobileTitle>{productName}</StyledMobileTitle>
            <StyledLocation>{location}</StyledLocation>
            {presentStatus(status)}
            <br />
            <StyledPayBox>
              <StyledPay>{price}</StyledPay>
              <StyledDay> / 일</StyledDay>
              <br />
              <StyledTimeForToday>{createdAt}</StyledTimeForToday>
            </StyledPayBox>
            <StyledAddress>{address}</StyledAddress>
            <StyledMobileLikeAndChatBox>
              <StyledMobileLikeWrap>
                <StyledLike
                  src="https://img.icons8.com/ios/50/737373/like--v1.png"
                  alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
                />
                <span>{wishNum}</span>
              </StyledMobileLikeWrap>
            </StyledMobileLikeAndChatBox>
          </StyledMobileContentBox>
        </StyledMobileItemBox>
      </Mobile>
    </>
  );
};

const StyledWaiting = styled.span`
  position: absolute;
  right: 5%;
  bottom: 5%;
  padding: 2px;
`;
const StyledStatus = styled.span`
  position: absolute;
  right: 5%;
  bottom: 8%;
  background-color: #2b8fd6;
  border-radius: 5px;
  padding: 2px 3px;
  font-size: 14px;
  font-weight: 600;
  color: white;
`;

const StyledItemBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px 0 10px;
  position: relative;
  border-radius: 10px;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee6e 100%);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    transform: scale(1.04);
  }
`;

const StyledMobileItemBox = styled.div`
  border-bottom: 1px solid #c7c6c6bc;
  padding: 10px 10px 0 10px;
  position: relative;
  background-image: linear-gradient(120deg, #ffffff 0%, #ebedee6e 100%);
  display: flex;
  background-color: white;
  padding: 0;
  align-items: center;
`;

const StyledImgBox = styled.div`
  padding: 2px;
  width: 180px;
  height: 140px;
  margin-bottom: 3px;
`;

const StyledMobileImgBox = styled.div`
  padding: 2px;
  width: 150px;
  height: 140px;
  margin: 5px 15px 5px 10px;
`;

const StyledImg = styled.img`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const StyledContentBox = styled.div`
  position: relative;
  height: 130px;
  margin-top: 12px;
  margin-bottom: 5px;
`;

const StyledMobileContentBox = styled.div`
  width: 200px;
  margin-top: 12px;
`;

const StyledTitle = styled.div`
  margin-bottom: 5px;
  font-weight: 600;
  overflow: hidden; // 을 사용해 영역을 감출 것
  text-overflow: ellipsis; // 로 ... 을 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  word-break: break-all;
  width: 180px;
  height: 20px;
  cursor: pointer;
`;

const StyledMobileTitle = styled.div`
  margin-bottom: 5px;
  font-weight: 600;
  overflow: hidden; // 을 사용해 영역을 감출 것
  text-overflow: ellipsis; // 로 ... 을 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  word-break: break-all;
  width: 210px;
  height: 20px;
  cursor: pointer;
`;

const StyledCateId = styled.span`
  font-size: 13px;
`;
const StyledTimeForToday = styled(StyledCateId)`
  color: gray;
`;

const StyledLocation = styled(StyledCateId)`
  color: gray;
`;

const StyledPayBox = styled.div`
  margin: 5px 0 5px 0;
`;
const StyledPay = styled.span`
  font-weight: 600;
`;

const StyledDay = styled.span`
  font-size: 13px;
`;

const StyledAddress = styled.div`
  font-size: small;
  font-weight: 500;
`;

const StyledLikeAndChatBox = styled.div`
  width: max-content;
  height: max-content;
  display: flex;
  position: relative;
  font-size: small;
`;

const StyledMobileLikeAndChatBox = styled.div`
  width: max-content;
  height: max-content;
  display: flex;
  position: relative;
  font-size: small;
  padding-top: 5px;
`;

const StyledLikeWrap = styled.span`
  display: flex;
  margin: 5px 12px 0 0;
  align-items: center;
  width: max-content;
`;

const StyledMobileLikeWrap = styled.span`
  display: flex;
  align-items: center;
  width: max-content;
  bottom: 0;
`;

const StyledLike = styled.img`
  width: 20px;
  height: 20px;
  margin: 5px 5px 5px 0;
  cursor: pointer;
`;
