import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyChatRoom } from "../../redux/modules/chatSlice";
import { ChatRoomItem } from "../../components/chat/ChatRoomItem";
import { StyledChatRoomList } from "./styled";
import { Layout } from "../../components/layout/Layout";

export const ChatRoomList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyChatRoom());
  }, []);

  const myChatList = useSelector((state) => state.chat.chatRoomList);

  return (
      <StyledChatRoomList>
        <div className="chattingroom_wrap">
          {myChatList === undefined ? (
            <div className="search_empty_text">
              거래를 위해 채팅을 시작해보세요!
            </div>
          ) : (
            myChatList.map((item, index) => {
              return <ChatRoomItem item={item} key={index} />;
            })
          )}
        </div>
      </StyledChatRoomList>
  );
};
