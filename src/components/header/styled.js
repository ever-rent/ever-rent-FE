import styled from "styled-components";

export const StyledChatHeader = styled.div`
  .header_wrap {
    height: 50px;
    min-width: 350px;
    padding: 0.5rem;
    display: flex;
    position: sticky;
    z-index: 2;
  }
  .header_content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header_done {
    color: #fff;
    background-color: rgb(71, 181, 255);
    border-radius: 10px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
  }
`;
