import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { StyledChatHeader } from "./styled";

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
