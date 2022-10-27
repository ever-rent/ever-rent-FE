import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getBorrowList } from "../../redux/modules/mypageSlice";
import { BorrowCommonList } from "./BorrowCommonList";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";

export const BorrowStatus = () => {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);

  const borrow = useSelector((state) => state.mypage.borrow);
  const past = useSelector((state) => state.mypage.past);

  useEffect(() => {
    dispatch(getBorrowList());
  }, [dispatch]);

  const CommonList = (tabIndex) => {
    switch (tabIndex) {
      case 0:
        return <BorrowCommonList props={borrow} index={tabIndex} />;
      case 1:
        return <BorrowCommonList props={past} index={tabIndex} />;
      default:
        return;
    }
  };

  const borrowHandler = (e) => {
    e.preventDefault();
    setTabIndex(0);
    dispatch(getBorrowList());
  };

  const tabArray = [
    {
      key: "borrow",
      tab: (
        <StyledTab
          className={tabIndex === 0 ? "select" : ""}
          onClick={borrowHandler}
        >
          목록
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
        {CommonList(tabIndex)}
      </Desktop>
      {/* ################ 모바일 ################ */}
      <Mobile>
        <StyledMobileisStatusDetail>
          <StyledTabBar>
            {tabArray.map((item) => {
              return <div key={item.key}>{item.tab}</div>;
            })}
          </StyledTabBar>
          <StyledCommonListBox>{CommonList(tabIndex)}</StyledCommonListBox>
        </StyledMobileisStatusDetail>
      </Mobile>
    </>
  );
};

const StyledTab = styled.div`
  padding: 5px;
`;
const StyledisStatusDetail = styled.div`
  color: gray;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 630px;
  height: 45px;
  align-items: center;
  justify-content: space-around;
  margin: 10px 0;
  border-radius: 5px;
  transition: 0.1ms;

  cursor: pointer;
  .select {
    :hover {
      transform: scale(1.1);
    }
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

const StyledMobileisStatusDetail = styled.div`
  color: gray;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  max-width: max-content;
  height: 45px;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  margin-top: 10px;
  border-radius: 5px;
  gap: 0;
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
