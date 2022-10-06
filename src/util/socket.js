import SockJS from "sockjs-client";
import StompJS from "stompjs";

export const stompConnect = (token, userId) => {
  const socket = new SockJS("http://");
  const stompClient = StompJS.over(socket);
};
