import { ChatRoomItem } from "../../components/chat/ChatRoomItem";
import { StyledChatRoomList } from "./styled";
// import { useQuery } from "react-query";
// import { chatAPI } from "../../server/api";
import { ChatHeader } from "../../components/header/ChatHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyChatRoom } from "../../redux/modules/chatSlice";

export const ChatRoomList = ({ isSideNav }) => {
  // const { data } = useQuery("getChatRoomList", () => chatAPI.getChatRoomList());
  // const chatRoomList = data?.data.chatRoomResponseDtoList;

  const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMyChatRoom());
	}, []);

	const myChatList = useSelector((state) => state.chat.chatRoomList);

  return (
    <>
      {isSideNav ? (
        <StyledChatRoomList isSideNav={isSideNav}>
          {!myChatList ? (
            <h2>대화중인 채팅방이 없습니다.</h2>
          ) : (
            myChatList.map((item, index) => {
              return <ChatRoomItem item={item} key={index} />;
            })
          )}
        </StyledChatRoomList>
      ) : (
        <StyledChatRoomList isSideNav={isSideNav}>
          <ChatHeader />
          {!myChatList ? (
            <h2>대화중인 채팅방이 없습니다.</h2>
          ) : (
            myChatList.map((item, index) => {
              return <ChatRoomItem item={item} key={index} />;
            })
          )}
        </StyledChatRoomList>
      )}
    </>
  );
};
