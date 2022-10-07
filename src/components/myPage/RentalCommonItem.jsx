import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { acceptOrder } from "../../redux/modules/mypageSlice";
import Swal from "sweetalert2";
import { Mobile, Desktop } from "../../Hooks/MideaQuery";
import { imgFirstString } from "../../server/api";

export const RentalCommonItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const { id, imgUrlArray, productName, content, memberName } = item;
  //TODO: 현재 데이터 id가 null 뿐이어서 확인 불가.
  // console.log("RentalCommonItem >> id", String(id))
  // console.log(typeof String(id))
  // console.log("RentalCommonItem", item);

  const acceptHandler = () => {
    Swal.fire({
      title: "정말로 수락하시겠습니까?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "rgb(71, 181, 255)",
      cancelButtonColor: "rgb(184, 221, 247)",
      confirmButtonText: "수락",
      cancelButtonText: "취소",
    }).then(dispatch(acceptOrder(String(id))));
  };

  const acceptAndReject = (index) => {
    if (index === 1) {
      return (
        <div>
          <button onClick={acceptHandler}>수락</button>
          <button>거절</button>
        </div>
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
      return <span>예약자 : {memberName}</span>;
    } else {
      return;
    }
  };

  return (
    <>
      <Desktop>
        <StyledItem>
          {/* <img src={imgUrl} alt="img" /> */}
          {insertImg(index)}
          <div className="span-div">
            <span className="title">{productName}</span>
            <span>{content}</span>
            <span>
              남은 기간 : <span className="date">3일</span>
            </span>
            {reservation(index)}
          </div>
          <div>{acceptAndReject(index)}</div>
        </StyledItem>
      </Desktop>

      <Mobile>
        <StyledMobileItem>
          {/* <img src={imgUrl} alt="img" /> */}
          {insertImg(index)}
          <div className="span-div">
            <span className="title">{productName}</span>
            <span>{content}</span>
            <span>
              남은 기간 : <span className="date">3일</span>
            </span>
            {reservation(index)}
          </div>
          <div>{acceptAndReject(index)}</div>
        </StyledMobileItem>
      </Mobile>
    </>
  );
};

const StyledItem = styled.div`
  /* border: 1px solid red; */
  width: 680px;
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
  /* border: 1px solid red; */
  display: flex;
  position: relative;
  padding: 10px;
  margin-top: 10px;
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
