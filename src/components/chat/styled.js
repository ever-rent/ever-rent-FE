import styled from "styled-components";

export const StyledChatRoomItem = styled.div`
  .chattingRoomCard_wrap {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid $color-sub;
    margin-bottom: 20px;
    height: 80px;
  }
  .chattingRoomCard_container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 55px;
  }
  .chattingRoomCard_1_box {
    width: 55px;
    height: 55px;
    margin-right: 0.8rem;
  }
  .chattingRoomCard_1_box_img {
    width: 55px;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }
  .chattingRoomCard_2_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    width: calc(100% - 122.8px);
  }
  .chattingRoomCard_2_box_top {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .chattingRoomCard_2_box_top_1 {
    font-weight: 700;
  }
  .chattingRoomCard_2_box_top_2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.93rem;
    color: $color-medium;
  }
  .chattingRoomCard_2_box_bottom {
    color: $color-medium;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .chattingRoomCard_3_box {
    width: 60px;
    height: 60px;
  }
  .chattingRoomCard_3_box_img {
    width: 55px;
    aspect-ratio: 1/1;
    border-radius: 7px;
  }
`;