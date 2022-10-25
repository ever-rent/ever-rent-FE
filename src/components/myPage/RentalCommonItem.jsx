import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { acceptOrder } from "../../redux/modules/mypageSlice";
import Swal from "sweetalert2";
import { Mobile, Desktop } from "../../Hooks/MideaQuery";
import { imgFirstString, mypageAPI } from "../../server/api";
import { dateToTime } from "../../util/timeToToday";

export const RentalCommonItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const {
    id,
    price,
    imgUrlArray,
    productName,
    content,
    memberName,
    rentStart,
    rentEnd,
    buyStart,
    buyEnd,
  } = item;
  // console.log(item);

  console.log("RentalCommonItem", item);

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
    console.log(typeof id);
    console.log(typeof String(id));

    // dispatch(acceptOrder(String(id)));
  };
  console.log(id);

  const fetch = async () => {
    const res = await mypageAPI.acceptOrder(String(id));
    console.log("response", res.data);
  };

  const acceptAndReject = (index) => {
    if (index === 1) {
      return (
        <StyledButtonBox>
          <StyledAcceptbutton onClick={acceptHandler}>수락</StyledAcceptbutton>
          {/* <StyledRejectdbutton>거절</StyledRejectdbutton> */}
        </StyledButtonBox>
      );
    } else {
      return;
    }
  };

  // const [isPrice, setIsPrice] = useState(0);
  // setTimeout(() => {
  //   setIsPrice(price);
  // }, 800);

  const priceBox = (index) => {
    if (index === 0) {
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
            <div>남은기간 : {rentStatus}</div>
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

  const insertImg = (index) => {
    if (index === 0) {
      return <img src={`${imgFirstString}${imgUrlArray[0]}`} alt="img" />;
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
  console.log("rentStatus", rentStatus);

  useEffect(() => {
    let timeStatus = item?.rentEnd;
    setRentStatus(dateToTime(new Date(timeStatus)));
  }, [rentEnd, item]);
  console.log("rentStatus", rentStatus);

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
      /* color: #999; */
      font-size: 17px;
      font-weight: 600;
      /* margin-bottom: 5px; */
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
  /* min-width: max-content; */
`;

const StyledRejectdbutton = styled.button`
  /* background-color: #47b5ff; */
  color: gray;
  border: transparent;
  border-radius: 3px;
  padding: 4px 5px;
  margin-right: 7px;
  cursor: pointer;
  /* min-width: max-content; */
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
      font-size: 17px;
      font-weight: 600;
    }
    .date {
      font-size: 13px;
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
  }
`;
