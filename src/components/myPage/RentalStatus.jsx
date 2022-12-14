import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RentalCommonList } from "./RentalCommonList";
import { useDispatch, useSelector } from "react-redux";
import { getMyPageList } from "../../redux/modules/mypageSlice";
import { getMyPagePending } from "../../redux/modules/mypageSlice";
import { getMyPageConfirm } from "../../redux/modules/mypageSlice";
import { getMyPageExpired } from "../../redux/modules/mypageSlice";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";
export const RentalStatus = () => {
  const dispatch = useDispatch();

  const [tabIndex, setTabIndex] = useState(0);

  const list = useSelector((state) => state.mypage.list);
  const pending = useSelector((state) => state.mypage.pending);
  const confirm = useSelector((state) => state.mypage.confirm);
  const deadline = useSelector((state) => state.mypage.deadline);

  useEffect(() => {
    dispatch(getMyPageList());
  }, [dispatch]);

  const commonList = (tabIndex) => {
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
        <StyledTab
          className={tabIndex === 0 ? "select" : ""}
          onClick={listHandler}
        >
          ??????
        </StyledTab>
      ),
    },
    {
      key: "pending",
      tab: (
        <StyledTab
          className={tabIndex === 1 ? "select" : ""}
          onClick={pendingHandler}
        >
          ?????????
        </StyledTab>
      ),
    },
    {
      key: "confirm",
      tab: (
        <StyledTab
          className={tabIndex === 2 ? "select" : ""}
          onClick={confirmRentalHandler}
        >
          ????????????
        </StyledTab>
      ),
    },
    {
      key: "overDeadline",
      tab: (
        <StyledTab
          className={tabIndex === 3 ? "select" : ""}
          onClick={overDeadlineHandler}
        >
          ????????????
        </StyledTab>
      ),
    },
  ];

  return (
    <>
      <Desktop>
        <StyledisStatusDetail>
          {tabArray.map((item) => {
            return <div key={item.key}>{item.tab}</div>;
          })}
        </StyledisStatusDetail>
        <StyledList>{commonList(tabIndex)}</StyledList>
      </Desktop>
      {/* ################ ????????? ################ */}
      <Mobile>
        <StyledMobileisStatusDetail>
          <StyledTabBar>
            {tabArray.map((item) => {
              return <div key={item.key}>{item.tab}</div>;
            })}
          </StyledTabBar>
          <StyledCommonListBox>{commonList(tabIndex)}</StyledCommonListBox>
        </StyledMobileisStatusDetail>
      </Mobile>
    </>
  );
};

const StyledTab = styled.div`
  padding: 5px;
`;

const StyledisStatusDetail = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  max-width: max-content;
  height: 45px;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  padding: 0 65px 0 80px;
  border-radius: 5px;
  gap: 60px;
  color: gray;
  cursor: pointer;
  .select {
    color: black;
    font-weight: bold;
    border-bottom: 3px solid #47b5ff;
    animation: tabarray 0.8s;
    @keyframes tabarray {
      from {
        opacity: 0.5;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const StyledList = styled.div`
  display: flex;
  transition: 0.6s;
`;

const StyledMobileisStatusDetail = styled.div`
  display: flex;
  flex-direction: column;
  max-width: max-content;
  height: 45px;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  margin: auto;
  margin-top: 10px;
  border-radius: 5px;
  gap: 0;
  cursor: pointer;
  transition: 0.6s;
  .select {
    font-weight: bold;
    border-bottom: 3px solid #47b5ff;
  }
`;

const StyledTabBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 470px;
  padding-top: 6px;
`;

const StyledCommonListBox = styled.div`
  width: 100%;
  margin-top: 7px;
`;
