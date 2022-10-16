import styled from "styled-components";

export const StyledChatRoomItem = styled.div`
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
