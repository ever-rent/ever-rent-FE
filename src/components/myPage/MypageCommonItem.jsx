import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { acceptOrder } from "../../redux/modules/mypageSlice";
import Swal from "sweetalert2";

export const MypageCommonItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const { id, imgUrl, productName, content, memberName } = item;
  console.log("MypageCommonItem", item);
  console.log("button", index);

  const acceptHandler = () => {
    Swal.fire({
      title: "정말로 수락하시겠습니까?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "rgb(71, 181, 255)",
      cancelButtonColor: "rgb(184, 221, 247)",
      confirmButtonText: "수락",
      cancelButtonText: "취소",
    }).then(dispatch(acceptOrder(id)));
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
      return <img src={imgUrl} alt="img" />;
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
  );
};

const StyledItem = styled.div`
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
