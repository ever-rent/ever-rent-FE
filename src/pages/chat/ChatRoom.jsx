import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../redux/modules/chatSlice";
import { useQuery, useQueryClient } from "react-query";
import { chatAPI, imgFirstString, productAPI } from "../../server/api";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Scrollbars from "react-custom-scrollbars";
import Swal from "sweetalert2";

import { ChatHeader } from "../../components/header/ChatHeader";
import { RangeCalrendar } from "../../components/calrendar/RangeCalrendar";
import { ChatForm } from "../../components/chat/ChatForm";

let stompClient = null;

export const ChatRoom = () => {
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
      <ChatForm
        userData={userData}
        setUserData={setUserData}
        sendMessage={sendMessage}
      />
    </StyledChatRoom>
  );
};

const StyledChatRoom = styled.div`
  .container {
    width: 50%;
    min-width: 350px;
    max-width: 500px;
    height: 65vh;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    padding: 0 10px;
    margin: 10rem auto 0;
  }

  .head-wrap {
    position: fixed;
    top: 0;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 2;
  }
  .head-container {
    display: flex;
    justify-content: space-around;
    position: fixed;
    width: 100%;
    min-width: 350px;
    border: 2px solid #e5e5e5;
    border-radius: 10px;
    background-color: #fff;
    padding: 1rem 0;
    z-index: 1;
  }
  .head-box {
    display: flex;
    gap: 1rem;
  }
  .head-img {
    width: 100%;
    height: 100%;
    border-radius: 7px;
    cursor: pointer;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
  .head-text-box {
    height: 3rem;
    cursor: pointer;
  }
  .head-title {
    font-size: 1rem;
    font-weight: 600;
  }
  .head-cost {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  .head-img-box {
    width: 3.125rem;
    height: 3.125rem;
  }

  .rent-button {
    width: 200px;
    height: 40px;
    border: none;
    border-radius: 7px;
    background-color: #f5f5f5;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      background-color: #e5e5e5;
    }
  }
  .flex-div {
    display: flex;
  }
  .order-button {
    width: 100px;
    height: 30px;
    border: none;
    border-radius: 7px;
    margin-left: 130px;
    color: #fff;
    background-color: rgb(71, 181, 255);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
  }

  .other-wrap {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }

  .other-name {
    font-size: 1rem;
  }

  .me-container {
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin: 0.625rem 0;
    gap: 0.5rem;
  }

  .other-container {
    display: flex;
    flex-direction: column;
    margin: 0.625rem 0;
    gap: 3px;
  }

  .other-msg-clock {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }

  .other-profile {
    margin-top: 10px;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    aspect-ratio: 1/1;
  }

  .clock-box {
    font-size: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: end;
  }

  .me-box {
    color: #fff;
    background-color: rgb(71, 181, 255);
    border-top-left-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    padding: 0.625rem 1rem;
    max-width: 80%;
  }

  .other-box {
    color: #000;
    background-color: #f5f5f5;
    border-bottom-right-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    padding: 0.5rem 1rem;
    max-width: 75%;
    font-weight: 500;
  }

  .input-container {
    width: 50%;
    min-width: 350px;
    max-width: 500px;
    padding: 20px 10px;
    margin: 0 auto;
    border: 2px solid #e5e5e5;
    border-radius: 10px;
    background-color: #fff;
  }
  .input-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.625rem;
    gap: 0.625rem;
    width: 100%;
  }
  .input {
    width: 100%;
    height: 3rem;
    border: none;
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 0 1rem;
    font-size: 1rem;
    &:focus {
      outline: none;
    }
  }
`;