import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RentList } from "../nav/RentList";
import { PendingList } from "./PendingList";
import { Confirm } from "./Confirm";
import { OverDeadLine } from "./OverDeadLine";
import { MypageCommonList } from "./MypageCommonList";
import { useDispatch, useSelector } from "react-redux";
import { myPageList } from "../../redux/modules/mypageSlice";
import { myPagePending } from "../../redux/modules/mypageSlice";
import { myPageConfirm } from "../../redux/modules/mypageSlice";
import { myPageOverDeadline } from "../../redux/modules/mypageSlice";

export const RentalStatus = () => {
  const dispatch = useDispatch();

  const [tabIndex, setTabIndex] = useState(0);

  // const list = useSelector((state) => state.mypage.list);
  // const pending = useSelector((state) => state.mypage.pending);
  // const confirm = useSelector((state) => state.mypage.confirm);
  // const deadline = useSelector((state) => state.mypage.deadline);

  // useEffect(() => {
  //   dispatch(myPageList());
  // }, []);

  // const CommonList = (tabIndex) => {
  //   switch (tabIndex) {
  //     case 0:
  //       return <MypageCommonList props={list} />;
  //     case 1:
  //       return <MypageCommonList props={pending} />;
  //     case 2:
  //       return <MypageCommonList props={confirm} />;
  //     case 3:
  //       return <MypageCommonList props={deadline} />;
  //     default:
  //       return;
  //   }
  // };

  const listHandler = (e) => {
    e.preventDefault();
    setTabIndex(0);
    // dispatch(myPageList())
  };
  const pendingHandler = (e) => {
    e.preventDefault();
    setTabIndex(1);
    // dispatch(myPagePending())
  };
  const confirmRentalHandler = (e) => {
    e.preventDefault();
    setTabIndex(2);
    // dispatch(myPageConfirm())
  };
  const overDeadlineHandler = (e) => {
    e.preventDefault();
    setTabIndex(3);
    // dispatch(myPageOverDeadline())
  };

  const tabArray = [
    {
      key: "list",
      tab: (
        <div className={tabIndex === 0 ? "select" : ""} onClick={listHandler}>
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
          onClick={pendingHandler}
        >
          대기중
        </div>
      ),
      content: <PendingList />,
    },
    {
      key: "confirm",
      tab: (
        <div
          className={tabIndex === 2 ? "select" : ""}
          onClick={confirmRentalHandler}
        >
          렌탈확정
        </div>
      ),
      content: <Confirm />,
    },
    {
      key: "overDeadline",
      tab: (
        <div
          className={tabIndex === 3 ? "select" : ""}
          onClick={overDeadlineHandler}
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
      {/* <MypageCommonList /> */}
      {/* <CommonList /> */}
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
