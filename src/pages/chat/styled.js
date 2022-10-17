import styled from "styled-components";

export const StyledChatRoomList = styled.div`
  width: 50%;
  min-width: 350px;
  max-width: 650px;
  margin: 0 auto;
  padding: ${({ isSideNav }) => (isSideNav ? 0 : "2rem")};
`;

export const StyledChatRoom = styled.div`
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
