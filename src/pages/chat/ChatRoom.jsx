import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsDetail } from "../../redux/modules/chatSlice";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { ChatHeader } from "../../components/header/ChatHeader";
import { StyledChatRoom } from "./styled";
import { auth } from "../../server/core/instance";
import { Layout } from "../../components/layout/Layout";

let stompClient = null;

export const ChatRoom = () => {
  const { productId } = useParams();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const PK = localStorage.getItem("memberId");
  const myNickname = localStorage.getItem("memberName");
  const token = localStorage.getItem("accessToken").slice(7);

  const roomData = useSelector((state) => state.chat.chatRoomDetail);
  const [chatList, setChatList] = useState([]);
  const [userData, setUserData] = useState({
    type: "",
    roomId: roomId,
    sender: "",
    message: "",
    profileUrl: "",
    enterUserCnt: "",
    createdAt: "",
    memberId: "",
    quitOwner: "",
  });

  //ScrollY값 가장 하단으로 이동
  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  useEffect(() => {
    registerUser();
    scrollToBottom();
  }, []);

  const handleValue = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const registerUser = () => {
    let sockJS = new SockJS(`${process.env.REACT_APP_SERVER_URL}/wss/chat`);
    stompClient = Stomp.over(sockJS);
    // stompClient.debug = null;
    stompClient.connect({ Authorization: token }, onConnected, onError);
  };

  const onConnected = async () => {
    const response = await dispatch(getProductsDetail(productId)).unwrap();
    if (response) {
      stompClient.subscribe(`/sub/chat/room/${roomId}`, onMessageReceived);
      userJoin(response);
      scrollToBottom();
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const userJoin = (response) => {
    let chatMessage = {
      type: "ENTER",
      roomId: roomId,
      sender: myNickname,
      message: "",
      profileUrl: "",
      enterUserCnt: "",
      createdAt: "",
      memberId: "",
      quitOwner: "",
    };

    let otherChatMessage = {
      type: "ENTER",
      roomId: roomId,
      sender: response.nickname,
      message: "",
      profileUrl: "",
      enterUserCnt: "",
      createdAt: "",
      memberId: "",
      quitOwner: "",
    };

    stompClient.send(`/pub/chat/message`, { PK }, JSON.stringify(chatMessage));
    stompClient.send(
      `/pub/chat/message`,
      { PK: response.memberId },
      JSON.stringify(otherChatMessage)
    );
  };

  const onMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);

    if (payloadData.type === "ENTER" || payloadData.type === "TALK") {
      // chatList.push(payloadData);
      // setChatList([...chatList]);
      auth.get(`/chat/message/${roomId}`).then((res) => {
        return setChatList([...res.data]);
      });
    }

    scrollToBottom();
  };

  const sendMessage = () => {
    if (stompClient && userData.message) {
      let chatMessage = {
        type: "TALK",
        roomId: roomId,
        sender: myNickname,
        message: userData.message,
        profileUrl: "",
        enterUserCnt: "",
        createdAt: "",
        memberId: "",
        quitOwner: "",
      };

      stompClient.send(
        "/pub/chat/message",
        { PK },
        JSON.stringify(chatMessage)
      );
      setUserData({ ...userData, message: "" });
    }

    scrollToBottom();
  };

  const quitRoom = () => {
    let chatMessage = {
      type: "QUIT",
      roomId: roomId,
      sender: myNickname,
      message: "",
      profileUrl: "",
      enterUserCnt: "",
      createdAt: "",
      memberId: "",
      quitOwner: "",
    };

    stompClient.send("/pub/chat/message", { PK }, JSON.stringify(chatMessage));
    setUserData({ ...userData, message: "" });

    navigate("/");
  };

  const onKeyPress = (event) => {
    event.preventDefault();

    sendMessage();
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  const detailTime = (a) => {
    const nowTime = new Date(a);
    const nowHour = nowTime.getHours();
    const nowMt = nowTime.getMinutes();
    if (nowHour <= 12) {
      if (nowHour < 10) {
        if (nowMt < 10) {
          return `오전 ` + "0" + nowHour + ":" + "0" + nowMt;
        } else {
          return `오전 ` + "0" + nowHour + ":" + nowMt;
        }
      } else {
        if (nowMt < 10) {
          return `오전 ` + nowHour + ":" + "0" + nowMt;
        } else {
          return `오전 ` + nowHour + ":" + nowMt;
        }
      }
    } else {
      const afterHour = nowHour - 12;
      if (afterHour < 10) {
        if (nowMt < 10) {
          return `오후 ` + "0" + afterHour + ":" + "0" + nowMt;
        } else {
          return `오후 ` + "0" + afterHour + ":" + nowMt;
        }
      } else {
        if (nowMt < 10) {
          return `오후 ` + afterHour + ":" + "0" + nowMt;
        } else {
          return `오후 ` + afterHour + ":" + nowMt;
        }
      }
    }
  };

  const postPrice = roomData.price
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const postDeposit = roomData.deposit
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Layout>
      <StyledChatRoom>
        <div className="chat_head_wrap">
          <ChatHeader quitRoom={quitRoom} />
          <div
            className="chat_head_container"
            onClick={() => navigate(`/detail/${roomData.id}`)}
          >
            <div className="chat_head_box">
              <div className="chat_head_text_box">
                <img
                  src={roomData.postImgUrl?.postImgUrlList[0]}
                  className="chat_head_img"
                  alt="img"
                />
              </div>
              <div className="Chat_Head_Text_Box">
                <div className="chat_head_title">{roomData.title}</div>
                <div className="chat_head_cost">
                  <div className="chat_head_cost_icon_box">
                    {/* <img
                    className="chat_head_cost_icon"
                    src={dailycost}
                    alt="img"
                  /> */}
                  </div>
                  {postPrice}원
                  <div className="chat_head_cost_icon_box">
                    {/* <img
                    className="chat_head_cost_icon"
                    src={deposit}
                    alt="img"
                  /> */}
                  </div>
                  {postDeposit}원
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="chat_container">
          {chatList?.map((chat, idx) => {
            return (
              <div key={idx}>
                {chat.memberId !== PK ? (
                  chat.message === "" ? (
                    ""
                  ) : (
                    <div className="chat_other_wrap">
                      <img
                        src={chat.profileUrl}
                        className="chat_other_profile"
                        alt="img"
                      />
                      <div className="chat_other_container">
                        <div className="chat_other_name">{chat.sender}</div>
                        <div className="chat_other_msg_clock">
                          <div className="chat_other_box">{chat.message}</div>
                          <div className="chat_clock_box">
                            <div className="chat_clock">
                              {/* {detailTime(chat.createdAt)} */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ) : chat.message === "" ? (
                  ""
                ) : (
                  <div className="chat_me_container">
                    <div className="chat_clock_box">
                      <div className="Chat_Clock">
                        {/* {detailTime(chat.createdAt)} */}
                      </div>
                    </div>
                    <div className="chat_me_box">{chat.message}</div>
                  </div>
                )}
              </div>
            );
          })}
          <div className="chat_input_container">
            <form
              className="chat_input_box"
              onSubmit={(event) => onKeyPress(event)}
            >
              <input
                className="chat_input"
                type="text"
                placeholder="대화를 시작해보세요!"
                value={userData.message}
                onChange={(event) => handleValue(event)}
              />
              <div className="chat_input_button_box">
                <button className="chat_input_button">
                  {/* <Icon icon="akar-icons:send" className="chat_button_icon" /> */}
                  전송
                </button>
              </div>
            </form>
          </div>
        </div>
      </StyledChatRoom>
    </Layout>
  );
};
