import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getBorrowList } from "../../redux/modules/mypageSlice";
import { getPastList } from "../../redux/modules/mypageSlice";
import { BorrowCommonList } from "./BorrowCommonList";

export const BorrowStatus = () => {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);

  const borrow = useSelector((state) => state.mypage.borrow);
  // console.log(borrow);
  const past = useSelector((state) => state.mypage.past);
  // console.log(past);

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
  const pastHandler = (e) => {
    e.preventDefault();
    setTabIndex(1);
    dispatch(getPastList());
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

    {
      key: "past",
      tab: (
        <StyledTab
          className={tabIndex === 1 ? "select" : ""}
          onClick={pastHandler}
        >
          과거 렌트 내역
        </StyledTab>
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

const StyledTab = styled.div`
  min-width: max-content;
  margin: 0 5vw;
`;
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

  @media only screen and (max-width: 767px) {
    display: flex;
    /* flex-direction: column; */
    gap: 0;
    width: auto;
    .select {
      font-weight: bold;
      border-bottom: 3px solid #47b5ff;
    }
  }
`;
