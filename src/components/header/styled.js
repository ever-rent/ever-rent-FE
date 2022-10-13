import styled from "styled-components";

export const StyledChatHeader = styled.div`
  .billy_logo {
    background-image: url("../../static/image/Billy_Logo.png");
    background-size: contain;
    background-repeat: no-repeat;
    width: 120px;
    height: 60px;
    display: absolute;
    margin-top: 30px;
  }

  .header_container {
    padding: 0 1rem 0.2rem 1rem;
    position: sticky;
    width: 100%;
    max-width: 420px;
    top: 0;
    z-index: 2;
    background-color: $color-white;
  }
  .chat_header_container {
    padding: 0 1rem 0.2rem 1rem;
    width: 100%;
    max-width: 420px;
    top: 0;
    z-index: 2;
    background-color: $color-white;
  }
  .header_Sign_container {
    padding: 0 1.5rem;
    position: sticky;
    max-width: 420px;
    width: 100%;
    top: 0;
    z-index: 2;
    background-color: $color-white;
  }

  .header_top {
    width: 100%;
    max-width: 420px;
    height: 10px;
    position: sticky;
    z-index: 2;
  }

  .header_wrap {
    width: 100%;
    max-width: 420px;
    height: 53px;
    display: flex;
    position: sticky;
    z-index: 2;
    justify-content: flex-end;
    align-items: center;
    background-color: $color-white;
  }

  .header_content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    bottom: 0;
  }

  .header_title {
    font-family: "Noto Sans";
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
  }

  .header_done {
    color: $color-main;
    font-size: 1rem;
    font-weight: 500;
    margin-left: 11px;
    cursor: pointer;
  }

  //main header
  .main_header_content {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  //mypage header
  .mypage_header_content {
    width: 100%;
    display: flex;
    position: sticky;
  }

  .mypage_header_title {
    font-family: "Noto Sans";
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    text-align: center;
    margin: auto;
    justify-content: center;
  }
  .mypage_header_done {
    margin-left: 32px;
  }

  .detail_header_container {
    padding: 0 1rem;
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100%;
    max-width: 420px;
  }

  .detail_header_wrap {
    width: 100%;
    height: 53px;
    display: flex;
    position: sticky;
    z-index: 2;
    align-items: center;
  }

  .mypage_header_content {
    width: 100%;
    justify-content: space-between;
  }

  .header_detail_container {
    padding: 0 1rem;
    position: sticky;
  }

  .detail_dot_icon {
    background-image: url("../../static/image/detail_dot_icon.svg");
    background-size: contain;
    background-repeat: no-repeat;
    width: 80px;
    display: absolute;
  }

  .header_none {
    width: 40px;
  }
`;
