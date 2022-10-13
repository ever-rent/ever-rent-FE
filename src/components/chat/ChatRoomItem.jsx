import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledChatRoomItem } from "./styled";

export const ChatRoomItem = ({ item }) => {
  const detailDate = (a) => {
    const milliSeconds = new Date() - a;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };
  const navigate = useNavigate();
  const nowDate = detailDate(new Date(item.lastMessageTime));

  return (
    <StyledChatRoomItem
      className="chattingRoomCard_wrap"
      onClick={() => navigate(`/chat/room/${item.productId}/${item.roomId}`)}
    >
      <div className="chattingRoomCard_container">
        <div className="chattingRoomCard_1_box">
          <img
            className="chattingRoomCard_1_box_img"
            src={
              item.profileUrl !== null
                ? item.profileUrl
                : "https://billy-img-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png"
            }
            alt="img"
          />
        </div>
        <div className="chattingRoomCard_2_box">
          <div className="chattingRoomCard_2_box_top">
            <div className="chattingRoomCard_2_box_top_1">
              {item.otherNickname === null
                ? "대화상대 없음"
                : item.otherNickname}
            </div>
            <div className="chattingRoomCard_2_box_top_2">{nowDate}</div>
          </div>
          <div className="chattingRoomCard_2_box_bottom">
            {item.lastMessage}
          </div>
        </div>
        <div className="chattingRoomCard_3_box">
          <img
            className="chattingRoomCard_3_box_img"
            src={item.productImgUrl}
            alt="img"
          />
        </div>
      </div>
    </StyledChatRoomItem>
  );
};
