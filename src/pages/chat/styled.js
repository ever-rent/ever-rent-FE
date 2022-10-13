import styled from "styled-components";

export const StyledChatRoomList = styled.div`
  .chattingroom_wrap {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    margin-bottom: 84px;
  }
`;

export const StyledChatRoom = styled.div`
  .chat_container {
    width: 100%;
    height: 100%;
    padding: 8.5rem 0.75rem 5.5rem;
  }
  .chat_head_wrap {
    position: fixed;
    width: 100%;
  }
  .chat_head_container {
    padding: 0 1rem;
    width: 100%;
    max-width: 420px;
    display: flex;
    position: fixed;
    flex-direction: row;
    background-color: $color-white;
    z-index: 4;
    height: 4.375rem;
  }
  .chat_head_box {
    width: 100%;
    border-bottom: 1px solid $color-sub;
    display: flex;
    flex-direction: row;
    gap: 0.75rem;
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
    display: flex;
    flex-direction: column;
    height: 3.125rem;
    justify-content: center;
    gap: 3px;
    cursor: pointer;
  }
  .chat_head_title {
    font-size: 0.9375rem;
    color: $color-primary;
    font-weight: 600;
  }
  .chat_head_cost {
    display: flex;
    flex-direction: row;
    gap: 5px;
    font-size: 0.875rem;
  }
  .chat_head_cost_icon_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .chat_head_cost_icon {
    width: 13px;
    height: 13px;
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
    color: $color-medium;
    font-size: 0.875rem;
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
    background-color: $color-light;
    border-bottom-right-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    padding: 0.625rem 1rem;
    max-width: 75%;
  }

  .chat_input_box {
    display: flex;
    flex-direction: row;
    height: 2.625rem;
    gap: 0.625rem;
    width: 100%;
    padding: 0 1rem;
  }

  .chat_input {
    width: 100%;
    height: 2.625rem;
    border: none;
    background-color: $color-light;
    border-radius: 0.43rem;
    padding: 0 0.9rem;
    margin: auto;
    font-size: 1rem;
    &:focus {
      outline: none;
    }
  }

  .chat_input_button_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
  .chat_input_button {
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    background-color: $color-white;
  }
  .chat_button_icon {
    width: 100%;
    height: 100%;
    background-color: none;
  }

  .chat_input_container {
    position: fixed;
    background-color: $color-white;
    width: 100%;
    max-width: 420px;
    left: 50%;
    bottom: 0;
    padding-top: 10px;
    transform: translateX(-50%);
    height: 5.5rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;
