import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";
import { dateToTime } from "../../util/timeToToday";

export const BorrowCommonItem = ({ item, index }) => {
  const { imgUrl, productName, buyStart, buyEnd } = item;
  //TODO: 아직 정해지지 않았지만 일단 빌린물건 목록에만 img가 나오도록 설정.
  const insertImg = (index) => {
    if (index === 0) {
      return <img src={imgUrl} alt="img" />;
    } else {
      return;
    }
  };

  //남은 기간
  const [rentStatus, setRentStatus] = useState("");

  useEffect(() => {
    let timeStatus = item?.buyEnd;
    setRentStatus(dateToTime(new Date(timeStatus)));
  }, [buyEnd, item]);

  return (
    <>
      <Desktop>
        <StyledItem>
          <StyledContentBox className="span-div">
            <span className="title">{productName}</span>
            <span className="apply">
              <div>
                신청 기간 : {buyStart} ~ {buyEnd}
              </div>
            </span>
            <span className="date">
              <div>마감기한 : {rentStatus}</div>
            </span>
          </StyledContentBox>
        </StyledItem>
      </Desktop>

      <Mobile>
        <StyledMobileItem>
          <div className="span-div">
            <span className="title">{productName}</span>
            <span className="apply">
              <div>
                신청 기간 : {buyStart} ~ {buyEnd}
              </div>
            </span>
            <span className="date">
              <div>마감기한 : {rentStatus}</div>
            </span>
          </div>
        </StyledMobileItem>
      </Mobile>
    </>
  );
};

const StyledItem = styled.div`
  /* border: 1px solid red; */
  width: 600px;
  display: flex;
  position: relative;
  padding: 10px;
  margin-bottom: 5px;
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
      font-size: 17px;
      font-weight: 600;
      /* margin-bottom: 5px; */
    }
    .date {
      margin-top: 5px;
      font-size: 15px;
      color: red;
      font-weight: 500;
    }
    .content {
      color: #999;
    }
    .price {
      /* color: #0092f3; */
      font-weight: 600;
      /* font-size: 12px; */
    }
    .period {
      color: #999;
      font-size: 13px;
    }
    .day {
      font-size: 13px;
    }
    .resevation {
      font-size: 15px;
      margin-top: 9px;
    }
    .apply {
      color: #999;
      font-size: 13px;
      margin-top: 9px;
    }
  }
`;

const StyledContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledMobileItem = styled.div`
  /* border: 1px solid red; */
  display: flex;
  position: relative;
  padding: 10px;
  /* margin-bottom: 7px; */
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
      color: black;
      font-size: 17px;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .date {
      font-size: 15px;
      color: red;
      font-weight: 500;
      margin-top: 5px;
    }
    .content {
      color: #999;
    }
    .price {
      /* color: #0092f3; */
      font-weight: 600;
      /* font-size: 12px; */
    }
    .period {
      color: #999;
      font-size: 13px;
    }
    .day {
      font-size: 13px;
    }
  }
`;
