import styled from "styled-components";

export const StyledChatRoomList = styled.div`
  .chattingroom_wrap {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
`;

export const StyledChatRoom = styled.div`
  .chat_container {
    width: 50%;
    min-width: 350px;
    height: 100%;
    margin: 0 auto;
    padding: 8rem 1rem;
  }
  .chat_head_wrap {
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
  .chat_head_container {
    position: fixed;
    width: 100%;
    min-width: 350px;
    border: 2px solid #e5e5e5;
    border-radius: 10px;
    background-color: #fff;
    padding: 1rem 0;
    z-index: 1;
  }
  .chat_head_box {
    display: flex;
    gap: 1rem;
  }
  .chat_head_img {
    width: 100%;
    height: 100%;
    border-radius: 7px;
    cursor: pointer;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
  .chat_head_text_box {
    height: 3rem;
    cursor: pointer;
  }
  .chat_head_title {
    font-size: 1rem;
    font-weight: 600;
  }
  .chat_head_cost {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  .chat_head_img_box {
    width: 3.125rem;
    height: 3.125rem;
  }

  .chat_other_wrap {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }
  .chat_other_name {
    font-size: 1rem;
  }

  .chat_me_container {
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin: 0.625rem 0;
    gap: 0.5rem;
  }

  .chat_other_container {
    display: flex;
    flex-direction: column;
    margin: 0.625rem 0;
    gap: 3px;
  }
  .chat_other_msg_clock {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }

  .chat_other_profile {
    margin-top: 10px;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    aspect-ratio: 1/1;
  }

  .chat_clock_box {
    color: $color-medium;
    font-size: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: end;
  }

  .chat_me_box {
    background-color: $color-message;
    border-bottom-left-radius: 0.75rem;
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    padding: 0.625rem 1rem;
    max-width: 80%;
  }

  .chat_other_box {
    color: #fff;
    background-color: rgb(71, 181, 255);
    border-bottom-right-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    padding: 0.5rem 1rem;
    max-width: 75%;
    font-weight: 500;
  }

  .chat_input_box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.625rem;
    gap: 0.625rem;
    width: 100%;
    padding: 0 1rem;
  }

  .chat_input {
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
  .chat_input_container {
    position: fixed;
    width: 50%;
    min-width: 350px;
    left: 50%;
    bottom: 1rem;
    padding-top: 10px;
    transform: translateX(-52%);
    height: 5rem;
  }
`;
