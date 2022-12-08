import { useEffect } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { getMyChatRoom } from "../../redux/modules/chatSlice";

import { ChatRoomItem } from "../../components/chat/ChatRoomItem";
import { ChatHeader } from "../../components/header/ChatHeader";

export const ChatRoomList = ({ isSideNav }) => {
  // const { data } = useQuery("getChatRoomList", () => chatAPI.getChatRoomList());
  // const chatRoomList = data?.data.chatRoomResponseDtoList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyChatRoom());
  }, []);

  const chatRoomList = useSelector((state) => state.chat.chatRoomList);

  return (
    <>
      {isSideNav ? (
        <StyledChatRoomList isSideNav={isSideNav}>
          {!chatRoomList ? (
            <h2>대화중인 채팅방이 없습니다.</h2>
          ) : (
            chatRoomList.map((item, index) => {
              return <ChatRoomItem item={item} key={index} />;
            })
          )}
        </StyledChatRoomList>
      ) : (
        <StyledChatRoomList isSideNav={isSideNav}>
          <ChatHeader />
          {!chatRoomList ? (
            <h2>대화중인 채팅방이 없습니다.</h2>
          ) : (
            chatRoomList.map((item, index) => {
              return <ChatRoomItem item={item} key={index} />;
            })
          )}
        </StyledChatRoomList>
      )}
    </>
  );
};

const StyledChatRoomList = styled.div`
  width: 50%;
  min-width: 350px;
  max-width: 650px;
  margin: 0 auto;
  padding: ${({ isSideNav }) => (isSideNav ? 0 : "2rem")};
`;
