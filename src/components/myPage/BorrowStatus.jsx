import React, { useState } from "react";
import styled from "styled-components";
import { BorrowList } from "./BorrowList";
import { PastBorrow } from "./PastBorrow";

export const BorrowStatus = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabArray = [
    {
      key: "list",
      tab: (
        <div
          className={tabIndex === 0 ? "select" : ""}
          onClick={() => setTabIndex(0)}
        >
          목록
        </div>
      ),
      content: <BorrowList />,
    },

    {
      key: "overDeadLine",
      tab: (
        <div
          className={tabIndex === 1 ? "select" : ""}
          onClick={() => setTabIndex(1)}
        >
          과거 렌트 내역
        </div>
      ),
      content: <PastBorrow />, //임시데이터
    },
  ];

  return (
    <div>
      <StyledisStatusDetail>
        {tabArray.map((item) => {
          return <div key={item.key}>{item.tab}</div>;
        })}
      </StyledisStatusDetail>
      {tabArray[tabIndex].content}
    </div>
  );
};

const StyledisStatusDetail = styled.div`
  /* border: 1px solid red; */
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 630px;
  height: 45px;
  align-items: center;
  justify-content: space-around;
  margin: 10px 0;
  border-radius: 5px;
  cursor: pointer;
  .select {
    font-weight: bold;
    border-bottom: 3px solid #47b5ff;
  }
`;
