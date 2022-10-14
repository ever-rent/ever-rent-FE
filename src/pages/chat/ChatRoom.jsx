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
import { chatAPI, imgFirstString } from "../../server/api";
import { FaMoneyBillAlt } from "react-icons/fa";
import { RangeCalrendar } from "../../components/calrendar/RangeCalrendar";

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
  console.log(roomData);

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

  console.log(chatList);

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

  const [showDateInput, setShowDateInput] = useState(false);
  const [startDateInput, setStartDateInput] = useState("");
  const [endDateInput, setEndDateInput] = useState("");

  const startEndDays = (start, end) => {
    let startDay = start;
    let endDay = end;

    let sYaer = startDay?.getFullYear();
    let sMonth = startDay?.getMonth() + 1;
    let sDay = startDay?.getDate();
    let eYaer = endDay?.getFullYear();
    let eMonth = endDay?.getMonth() + 1;
    let eDay = endDay?.getDate();

    setStartDateInput(`${sYaer}-${sMonth}-${sDay}`);
    setEndDateInput(`${eYaer}-${eMonth}-${eDay}`);
  };
  console.log(startDateInput);
  console.log(endDateInput);

  const postOrderDate = async (startDate, endDate) => {
    await chatAPI
      .postOrderDate(roomData.id, {
        buyStart: startDate,
        buyEnd: endDate,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(startDate, endDate);
    setShowDateInput(false);
  };

  return (
    <Layout>
      <StyledChatRoom>
        <div className="chat_head_wrap">
          <ChatHeader quitRoom={quitRoom} />
          <div className="chat_head_container">
            <div className="chat_head_box">
              <div
                className="chat_head_text_box"
                onClick={() => navigate(`/productDetail/${roomData.id}`)}
              >
                <img
                  // src={`${imgFirstString}${roomData?.imgUrlArray[0]}`}
                  className="chat_head_img"
                  alt="img"
                />
              </div>
              <div className="Chat_Head_Text_Box">
                <div className="chat_head_title">{roomData.productName}</div>
                <div className="chat_head_cost">
                  <FaMoneyBillAlt />
                  {postPrice}원
                </div>
              </div>
            </div>
            {chatList ? (
              <button onClick={() => setShowDateInput(true)}>
                렌탈 신청하기
              </button>
            ) : (
              <button disabled>렌탈 신청하기</button>
            )}
            {showDateInput && (
              <div>
                <RangeCalrendar startEndDays={startEndDays} />
                <button
                  onClick={() => postOrderDate(startDateInput, endDateInput)}
                >
                  신청하기
                </button>
              </div>
            )}
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
                        src={
                          chat?.profileUrl === null
                            ? `https://source.boringavatars.com/beam/110/${chat?.memberId}?colors=7965EE,6FE7F1,FFDD4C,46B5FF,2883E0`
                            : chat?.profileUrl
                        }
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
