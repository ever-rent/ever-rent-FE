import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { imgFirstString } from "../../server/api";

export const ChatRoomItem = ({ item }) => {
  const navigate = useNavigate();

  const detailDate = (lastTime) => {
    const seconds = (new Date() - lastTime) / 1000 - 32400;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = days / 30;
    const years = days / 365;

    if (seconds < 60) return `방금 전`;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    if (days < 7) return `${Math.floor(days)}일 전`;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    return `${Math.floor(years)}년 전`;
  };

  const nowDate = detailDate(new Date(item?.lastMessageTime));

  return (
    <StyledChatRoomItem
      onClick={() => navigate(`/chat/room/${item.productId}/${item.roomId}`)}
    >
      <div className="container">
        <div className="profile-img-div">
          <img
            className="profile-img"
            src={`https://source.boringavatars.com/beam/110/${item?.otherMemberName}?colors=7965EE,6FE7F1,FFDD4C,46B5FF,2883E0`}
            alt="img"
          />
        </div>
        <div className="info-div-1">
          <div className="info-div-2">
            <div className="name-info">
              {item.otherMemberName === null
                ? "대화상대 없음"
                : item.otherMemberName}
            </div>
            <div className="time-info">{nowDate}</div>
          </div>
          <div className="last-message">{item.lastMessage}</div>
        </div>
        <div className="product-img-div">
          <img
            className="product-img"
            src={`${imgFirstString}${item.productImgUrl}`}
            alt="img"
          />
        </div>
      </div>
    </StyledChatRoomItem>
  );
};

const StyledChatRoomItem = styled.div`
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 15px;
  border-bottom: 1px solid #e5e5e5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
  .container {
    display: flex;
    width: 100%;
    height: 55px;
  }
  .profile-img-div {
    width: 55px;
    height: 55px;
    margin-right: 0.8rem;
  }
  .profile-img {
    width: 55px;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }
  .info-div-1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    width: calc(100% - 122.8px);
  }
  .info-div-2 {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .name-info {
    font-weight: 700;
  }
  .time-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.8rem;
  }
  .last-message {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .product-img-div {
    width: 60px;
    height: 60px;
  }
  .product-img {
    width: 55px;
    aspect-ratio: 1/1;
    border-radius: 7px;
  }
`;
