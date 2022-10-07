import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { useMutation } from "react-query";
import { imgFirstString, productAPI } from "../../server/api";
import { timeToToday } from "../../util/timeToToday";

export const WishItem = ({ item }) => {
  const [like, setLike] = useState(true);
  const [writeAt, setWriteAt] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  console.log(item);
  const { mutate } = useMutation(productAPI.toggleWishProduct, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.dir(error);
    },
  });

  useEffect(() => {
    let timeStatus = item.productWriteAt;
    timeStatus !== undefined ? setWriteAt(timeStatus) : (timeStatus = "");
    setCreatedAt(timeToToday(writeAt));
  }, [writeAt, item.productWriteAt]);

  return (
    <StyledItem>
      {like ? (
        <FcLike
          className="like"
          onClick={() => {
            setLike(!like);
            mutate(item.productId);
          }}
        />
      ) : (
        <FcLikePlaceholder
          className="like"
          onClick={() => {
            setLike(true);
            mutate(item.productId);
          }}
        />
      )}
      <img src={`${imgFirstString}${item.imgUrlArray[0]}`} alt="물건 사진" />
      <div className="span-div">
        <span className="title">{item.productName}</span>
        <span className="date">
          {item.mapLocation} · {createdAt}
        </span>
        <span className="price">
          {Number(item.price).toLocaleString("ko-KR")}원 / 일
        </span>
      </div>
    </StyledItem>
  );
};

const StyledItem = styled.div`
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
      font-weight: 400;
    }
    .date {
      color: #999;
      font-size: 12px;
    }
    .price {
      font-weight: 500;
    }
  }
`;
