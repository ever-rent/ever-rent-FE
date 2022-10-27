import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { acceptOrder } from "../../redux/modules/mypageSlice";
import Swal from "sweetalert2";
import { Mobile, Desktop } from "../../Hooks/MideaQuery";
import { imgFirstString } from "../../server/api";
import { dateToTime } from "../../util/timeToToday";
import { useNavigate } from "react-router-dom";

export const RentalCommonItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const {
    id,
    price,
    imgUrlArray,
    productName,
    memberName,
    rentStart,
    rentEnd,
    buyStart,
    buyEnd,
  } = item;

  const acceptHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "정말로 수락하시겠습니까?",
      text: "수락하시면 돌이킬 수 없습니다",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "rgb(71, 181, 255)",
      cancelButtonColor: "rgb(184, 221, 247)",
      confirmButtonText: "수락",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("수락되었습니다!");
        dispatch(acceptOrder(String(id)));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("취소되었습니다!");
      }
    });
  };

  const acceptAndReject = (index) => {
    if (index === 1) {
      return (
        <StyledButtonBox>
          <StyledAcceptbutton onClick={acceptHandler}>수락</StyledAcceptbutton>
        </StyledButtonBox>
      );
    } else {
      return;
    }
  };

  const priceBox = (index) => {
    if (index === 0 || index === 3) {
      return (
        <>
          <span>
            <span className="price">{price}원</span>
            <span className="day">/ 일</span>
          </span>
        </>
      );
    } else {
      return;
    }
  };

  const period = (index) => {
    if (index === 0) {
      return (
        <>
          <span className="period">
            {rentStart} ~ {rentEnd}
          </span>
          <span className="date">
            <div>마감까지 : {rentStatus}</div>
          </span>
        </>
      );
    } else if (index === 1 || index === 2) {
      return (
        <>
          <span className="apply">
            <div>
              신청 기간 : {buyStart} ~ {buyEnd}
            </div>
          </span>
        </>
      );
    } else {
      return;
    }
  };

  const navigate = useNavigate();

  const insertImg = (index) => {
    if (index === 0 || index === 3) {
      return (
        <StyledImg
          onClick={() => navigate(`/productDetail/${id}`)}
          src={`${imgFirstString}${imgUrlArray[0]}`}
          alt="img"
        />
      );
    } else {
      return;
    }
  };

  const reservation = (index) => {
    if (index !== 0) {
      return <span className="resevation">예약자 : {memberName}</span>;
    } else {
      return;
    }
  };

  const [rentStatus, setRentStatus] = useState("");

  useEffect(() => {
    let timeStatus = item?.rentEnd;
    setRentStatus(dateToTime(new Date(timeStatus)));
  }, [rentEnd, item]);

  useEffect(() => {}, []);
  return (
    <>
      <Desktop>
        <StyledItem>
          <div>{insertImg(index)}</div>
          <StyledContentBox className="span-div">
            <span className="title">{productName}</span>
            {priceBox(index)}
            {period(index)}
            {reservation(index)}
          </StyledContentBox>
          {acceptAndReject(index)}
        </StyledItem>
      </Desktop>
      {/* ################ 모바일 ################ */}
      <Mobile>
        <StyledMobileItem>
          {insertImg(index)}
          <StyledContentBox className="span-div">
            <span className="title">{productName}</span>
            {priceBox(index)}
            {period(index)}
            {reservation(index)}
          </StyledContentBox>
          {acceptAndReject(index)}
        </StyledMobileItem>
      </Mobile>
    </>
  );
};

const StyledItem = styled.div`
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
    }
    .date {
      font-size: 15px;
      color: red;
      font-weight: 500;
    }
    .content {
      color: #999;
    }
    .price {
      font-weight: 600;
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
      color: red;
      font-weight: 600;
      font-size: 15px;
      margin-top: 9px;
    }
  }
`;

const StyledContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledButtonBox = styled.div`
  position: absolute;
  right: 10%;
  bottom: 10%;
`;
const StyledAcceptbutton = styled.button`
  font-size: 20px;
  background-color: #47b5ff;
  color: white;
  border: transparent;
  border-radius: 5px;
  padding: 4px 5px;
  margin-right: 7px;
  cursor: pointer;
`;

const StyledImg = styled.img`
  cursor: pointer;
  object-fit: cover;
`;

const StyledMobileItem = styled.div`
  display: flex;
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
      font-size: 17px;
      font-weight: 600;
    }
    .date {
      font-size: 15px;
      color: red;
      font-weight: 500;
    }
    .content {
      color: #999;
    }
    .price {
      font-weight: 600;
    }
    .period {
      color: #999;
      font-size: 13px;
    }
    .day {
      font-size: 13px;
    }
    .apply {
      color: red;
      font-weight: 600;
      font-size: 15px;
      margin-top: 9px;
      margin-bottom: 7px;
    }
    .resevation {
      font-size: 15px;
    }
  }
`;
