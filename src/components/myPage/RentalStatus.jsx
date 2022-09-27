import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RentalCommonList } from "./RentalCommonList";
import { useDispatch, useSelector } from "react-redux";
import { getMyPageList } from "../../redux/modules/mypageSlice";
import { getMyPagePending } from "../../redux/modules/mypageSlice";
import { getMyPageConfirm } from "../../redux/modules/mypageSlice";
import { getMyPageExpired } from "../../redux/modules/mypageSlice";

export const RentalStatus = () => {
  const dispatch = useDispatch();

  const [tabIndex, setTabIndex] = useState(0);

  const list = useSelector((state) => state.mypage.list);
  // console.log(list);
  const pending = useSelector((state) => state.mypage.pending);
  // console.log(pending);
  const confirm = useSelector((state) => state.mypage.confirm);
  // console.log(confirm);
  const deadline = useSelector((state) => state.mypage.deadline);
  // console.log(deadline);

  useEffect(() => {
    dispatch(getMyPageList());
  }, [dispatch]);

  const CommonList = (tabIndex) => {
    switch (tabIndex) {
      case 0:
        return <RentalCommonList props={list} index={tabIndex} />;
      case 1:
        return <RentalCommonList props={pending} index={tabIndex} />;
      case 2:
        return <RentalCommonList props={confirm} index={tabIndex} />;
      case 3:
        return <RentalCommonList props={deadline} index={tabIndex} />;
      default:
        return;
    }
  };

  const listHandler = (e) => {
    e.preventDefault();
    setTabIndex(0);
    dispatch(getMyPageList());
  };
  const pendingHandler = (e) => {
    e.preventDefault();
    setTabIndex(1);
    dispatch(getMyPagePending());
  };
  const confirmRentalHandler = (e) => {
    e.preventDefault();
    setTabIndex(2);
    dispatch(getMyPageConfirm());
  };
  const overDeadlineHandler = (e) => {
    e.preventDefault();
    setTabIndex(3);
    dispatch(getMyPageExpired());
  };

  const tabArray = [
    {
      key: "list",
      tab: (
        <div className={tabIndex === 0 ? "select" : ""} onClick={listHandler}>
          목록
        </div>
      ),
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
    },
  ];

  return (
    <div>
      <StyledisStatusDetail>
        {tabArray.map((item) => {
          return <div key={item.key}>{item.tab}</div>;
        })}
      </StyledisStatusDetail>
      {CommonList(tabIndex)}
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
