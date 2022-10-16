import { ChatRoomItem } from "../../components/chat/ChatRoomItem";
import { StyledChatRoomList } from "./styled";
import { Layout } from "../../components/layout/Layout";
import { useQuery } from "react-query";
import { chatAPI } from "../../server/api";

export const ChatRoomList = ({ isSideNav }) => {
  const { data } = useQuery("getChatRoomList", () => chatAPI.getChatRoomList());
  const chatRoomList = data?.data.chatRoomResponseDtoList;

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
        <Layout>
          <StyledChatRoomList isSideNav={isSideNav}>
            {!chatRoomList ? (
              <h2>대화중인 채팅방이 없습니다.</h2>
            ) : (
              chatRoomList.map((item, index) => {
                return <ChatRoomItem item={item} key={index} />;
              })
            )}
          </StyledChatRoomList>
        </Layout>
      )}
    </>
  );
};
