import React, { useState } from "react";
import styled from "styled-components";
import { WishList } from "./WishList";
import { RentList } from "./RentList";
import { ChatList } from "./ChatList";

export const Tab = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabArray = [
    {
      key: "wish",
      tab: (
        <div
          className={tabIndex === 0 ? "select" : ""}
          onClick={() => setTabIndex(0)}
        >
          관심목록
        </div>
      ),
      content: <WishList />,
    },
    {
      key: "rent",
      tab: (
        <div
          className={tabIndex === 1 ? "select" : ""}
          onClick={() => setTabIndex(1)}
        >
          상품목록
        </div>
      ),
      content: <RentList />,
    },
    {
      key: "chat",
      tab: (
        <div
          className={tabIndex === 2 ? "select" : ""}
          onClick={() => setTabIndex(2)}
        >
          채팅목록
        </div>
      ),
      content: <ChatList />,
    },
  ];
  return (
    <StyledContainer>
      <StyledTab>
        {tabArray.map((item) => {
          return <div key={item.key}>{item.tab}</div>;
        })}
      </StyledTab>
      {tabArray[tabIndex].content}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 100%;
`;

const StyledTab = styled.div`
  display: flex;
  justify-content: space-around;
  cursor: pointer;
  div {
    padding: 0 0 10px 0;
  }
  .select {
    font-weight: bold;
    border-bottom: 3px solid #47b5ff;
  }
`;
