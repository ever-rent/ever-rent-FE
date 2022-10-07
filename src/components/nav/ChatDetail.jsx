import React from "react"
import styled from "styled-components"
import SockJS from "sockjs-client";
import StompJS from "stompjs";

export const ChatDetail = () => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = StompJS.over(socket);
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    return (
        <div>

        </div>
    )
}