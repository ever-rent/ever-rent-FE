import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyChatRoom } from "../../redux/modules/chatSlice";
import { ChatRoomItem } from "../../components/chat/ChatRoomItem";
import { StyledChatRoomList } from "./styled";
import { Layout } from "../../components/layout/Layout";

export const ChatRoomList = ({ isSideNav }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyChatRoom());
  }, [dispatch]);

  const myChatList = useSelector((state) => state.chat.chatRoomList);

  return (
    <>
      {isSideNav ? (
        <StyledChatRoomList isSideNav={isSideNav}>
          {myChatList === undefined ? (
            <div className="search_empty_text">대화중인 채팅방이 없습니다.</div>
          ) : (
            myChatList.map((item, index) => {
              return <ChatRoomItem item={item} key={index} />;
            })
          )}
        </StyledChatRoomList>
      ) : (
        <Layout>
          <StyledChatRoomList isSideNav={isSideNav}>
            {myChatList === undefined ? (
              <div className="search_empty_text">
                대화중인 채팅방이 없습니다.
              </div>
            ) : (
              myChatList.map((item, index) => {
                return <ChatRoomItem item={item} key={index} />;
              })
            )}
          </StyledChatRoomList>
        </Layout>
      )}
    </>
  );
};
