import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineChevronLeft } from "react-icons/hi";
import styled from "styled-components";

export const ChatHeader = ({ quitRoom, isChatRoom }) => {
  const navigate = useNavigate();

  return (
    <StyledChatHeader>
      <div className="header_wrap">
        <div className="header_content">
          <HiOutlineChevronLeft
            style={{ marginRight: "22px", cursor: "pointer" }}
            color="#212121"
            size="24px"
            onClick={() => navigate(-1)}
          />
          {isChatRoom && (
            <div className="header_done" onClick={() => quitRoom()}>
              채팅방 나가기
            </div>
          )}
        </div>
      </div>
    </StyledChatHeader>
  );
};

const StyledChatHeader = styled.div`
  .header_wrap {
    height: 50px;
    min-width: 350px;
    padding: 0.5rem;
    display: flex;
    position: sticky;
    z-index: 2;
  }
  .header_content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header_done {
    color: #fff;
    background-color: rgb(71, 181, 255);
    border-radius: 10px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
  }
`;
