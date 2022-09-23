import React, { useState } from "react";
import styled from "styled-components";
import { RentList } from "../nav/RentList";
import { PendingList } from "./PendingList";
import { NowRental } from "./NowRental";
import { OverDeadLine } from "./OverDeadLine";

export const RentalStatus = () => {
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
      content: <RentList />,
    },
    {
      key: "pending",
      tab: (
        <div
          className={tabIndex === 1 ? "select" : ""}
          onClick={() => setTabIndex(1)}
        >
          대기중
        </div>
      ),
      content: <PendingList />,
    },
    {
      key: "nowRental",
      tab: (
        <div
          className={tabIndex === 2 ? "select" : ""}
          onClick={() => setTabIndex(2)}
        >
          렌탈중
        </div>
      ),
      content: <NowRental />,
    },
    {
      key: "overDeadLine",
      tab: (
        <div
          className={tabIndex === 3 ? "select" : ""}
          onClick={() => setTabIndex(3)}
        >
          기한마감
        </div>
      ),
      content: <OverDeadLine />,
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

const StyledPending = styled.span`
  position: relative;
  width: 100px;
  height: 40px;
  line-height: 40px;
  /* background: #000; */
  /* color: #fff; */
  text-align: center;
  font-weight: bold;
  margin: 30px;
  /* &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-10px);
    border: 10px solid transparent;
    border-top-color: #000;
  } */
`;
