import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { ChatHeader } from "../../components/header/ChatHeader";
import { StyledChatRoom } from "./styled";
import { chatAPI, imgFirstString, productAPI } from "../../server/api";
import { RangeCalrendar } from "../../components/calrendar/RangeCalrendar";
import { FaMoneyBillAlt } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { FaRegWindowClose } from "react-icons/fa";
import Scrollbars from "react-custom-scrollbars";
import { useQuery, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../redux/modules/chatSlice";

let stompClient = null;

export const ChatRoom = memo(() => {
  const { productId } = useParams();
  const { roomId } = useParams();
  const scrollbarRef = useRef(null);
  const navigate = useNavigate();

  const PK = localStorage.getItem("memberId");
  const myNickname = localStorage.getItem("memberName");
  const token = localStorage.getItem("accessToken").slice(7);

  // const { data: productData } = useQuery("getProductDetail", () =>
  //   productAPI.getProductDetail(productId)
  // );
  // const productDetail = productData?.data.data;

  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.chat.productDetail);

  // const { data: chatData, isLoading } = useQuery("getChatMessage", () =>
  //   chatAPI.getChatMessage(roomId)
  // );

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

  useEffect(() => {
    registerUser();
  }, []);

  useEffect(() => {
    scrollbarRef.current?.scrollToBottom();
  }, [chatList]);

  const handleValue = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const registerUser = () => {
    const sockJS = new SockJS(`${process.env.REACT_APP_SERVER_URL}/wss/chat`);
    stompClient = Stomp.over(sockJS);
    stompClient.debug = null;
    stompClient.connect({ Authorization: token }, onConnected, onError);
  };

  const onConnected = async () => {
    const response = await dispatch(getProductDetail(productId)).unwrap();
    if (response) {
      stompClient.subscribe(`/sub/chat/room/${roomId}`, onMessageReceived);
      userJoin(response);
      scrollbarRef.current?.scrollToBottom();
    }
  };

  const onError = (err) => console.dir(err);

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
      chatAPI.getChatMessage(roomId).then((res) => {
        setChatList([...res.data]);
      });
    }
  };

  // const queryClient = useQueryClient();

  // const updateChatMessage = (payload) => {
  //   const message = JSON.parse(payload.body);
  //   if (
  //     message.type === "ENTER" ||
  //     message.type === "TALK" ||
  //     message.type === "QUIT"
  //   ) {
  //     queryClient.invalidateQueries("getChatMessage");
  //   }
  // };

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

  const detailTime = (createdAt) => {
    const time = new Date(createdAt);
    const hour = time.getHours() + 9;
    const minute = time.getMinutes();

    if (hour <= 12 || hour === 24) {
      if (hour === 24) {
        return `오전 ${hour - 12}:${minute}0`;
      }
      if (hour < 10) {
        if (minute < 10) {
          return `오전 0${hour}:0${minute}`;
        } else {
          return `오전 0${hour}:${minute}`;
        }
      } else {
        if (minute < 10) {
          return `오전 ${hour}:0${minute}`;
        } else {
          return `오전 ${hour}:${minute}`;
        }
      }
    } else {
      const afterHour = hour - 12;
      if (afterHour < 10) {
        if (minute < 10) {
          return `오후 0${afterHour}:0${minute}`;
        } else {
          return `오후 0${afterHour}:${minute}`;
        }
      } else {
        if (minute < 10) {
          return `오후 ${afterHour}:0${minute}`;
        } else {
          return `오후 ${afterHour}:${minute}`;
        }
      }
    }
  };

  const postPrice = productDetail?.price
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
    let sDay =
      startDay?.getDate() < 10
        ? "0" + `${startDay?.getDate()}`
        : `${startDay?.getDate()}`;
    let eYaer = endDay?.getFullYear();
    let eMonth = endDay?.getMonth() + 1;
    let eDay =
      endDay?.getDate() < 10
        ? "0" + `${endDay?.getDate()}`
        : `${endDay?.getDate()}`;
    setStartDateInput(`${sYaer}-${sMonth}-${sDay}`);
    setEndDateInput(`${eYaer}-${eMonth}-${eDay}`);
  };

  const postOrderDate = async (startDate, endDate) => {
    await chatAPI
      .postOrderDate(productDetail.id, {
        buyStart: startDate,
        buyEnd: endDate,
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "렌탈 신청이 완료되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(startDate, endDate);
    setShowDateInput(false);
  };

  return (
    <StyledChatRoom>
      <div className="head-wrap">
        <ChatHeader isChatRoom={true} quitRoom={quitRoom} />
        <div className="head-container">
          {/* {productDetail && ( */}
            <div className="head-box">
              <div
                className="head-text-box"
                onClick={() => navigate(`/productDetail/${productDetail.id}`)}
              >
                {/* {productDetail?.imgUrlArray.length && (
                  <img
                    src={`${imgFirstString}${productDetail?.imgUrlArray[0]}`}
                    className="head-img"
                    alt="img"
                  />
                )} */}
              </div>
              <div className="head-text-box">
                <div className="head-title">{productDetail?.productName}</div>
                <div className="head-cost">
                  <FaMoneyBillAlt />
                  {postPrice}원
                </div>
              </div>
            </div>
          {/* )} */}
          {chatList
            ? productDetail?.memberName !== myNickname && (
                <button
                  className="rent-button"
                  onClick={() => setShowDateInput(true)}
                >
                  렌탈 신청하기
                </button>
              )
            : productDetail?.memberName !== myNickname && (
                <button disabled>렌탈 신청하기</button>
              )}
          {showDateInput && (
            <div>
              <div className="flex-div">
                <RangeCalrendar
                  startEndDays={startEndDays}
                  chat={true}
                  rentStartday={productDetail?.rentStart}
                  rentEndday={productDetail?.rentEnd}
                />
                <FaRegWindowClose onClick={() => setShowDateInput(false)} />
              </div>
              <button
                className="order-button"
                onClick={() => postOrderDate(startDateInput, endDateInput)}
              >
                신청하기
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container">
        {/* {isLoading && <h2>채팅 메시지 불러오는중..</h2>} */}
        <Scrollbars autoHide ref={scrollbarRef}>
          {chatList?.map((chat, idx) => {
            return (
              <div key={idx}>
                {chat.memberId !== Number(PK) ? (
                  chat.message === "" ? (
                    ""
                  ) : (
                    <div className="other-wrap">
                      <img
                        src={
                          chat?.profileUrl === null
                            ? `https://source.boringavatars.com/beam/110/${chat?.memberId}?colors=7965EE,6FE7F1,FFDD4C,46B5FF,2883E0`
                            : chat?.profileUrl
                        }
                        className="other-profile"
                        alt="img"
                      />
                      <div className="other-container">
                        <div className="other-name">{chat.sender}</div>
                        <div className="other-msg-clock">
                          <div className="other-box">{chat.message}</div>
                          <div className="clock-box">
                            <div className="clock">
                              {detailTime(chat.createdAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ) : chat.message === "" ? (
                  ""
                ) : (
                  <div className="me-container">
                    <div className="clock-box">
                      <div className="clock">{detailTime(chat.createdAt)}</div>
                    </div>
                    <div className="me-box">{chat.message}</div>
                  </div>
                )}
              </div>
            );
          })}
        </Scrollbars>
      </div>
      <div className="input-container">
        <form className="input-box" onSubmit={(event) => onKeyPress(event)}>
          <input
            className="input"
            type="text"
            placeholder="메시지 보내기"
            value={userData.message}
            onChange={(event) => handleValue(event)}
          />
          <AiOutlineSend size="2rem" color="gray" cursor="pointer" />
        </form>
      </div>
    </StyledChatRoom>
  );
});
