// React import
import React from "react";
import { useNavigate } from "react-router-dom";
// Style & Icon import
import { HiOutlineChevronLeft } from "react-icons/hi";
import { StyledChatHeader } from "./styled";

export const ChatHeader = ({ quitRoom }) => {
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
          <div className="header_done" onClick={() => quitRoom()}>
            채팅방 나가기
          </div>
        </div>
      </div>
    </StyledChatHeader>
  );
};
