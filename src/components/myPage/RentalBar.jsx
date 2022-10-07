import React, { useState } from "react";
import styled from "styled-components";
import { RentalStatus } from "./RentalStatus";
import { BorrowStatus } from "./BorrowStatus";
// import { StatusBox } from "./StatusBox";

export const RentalBar = ({ like }) => {
  const [tabIndex, setTabIndex] = useState(0); //처음에 나오는 것이 빌려준 물건.
  console.log("RentalBar>>", like);

  const tabArray = [
    {
      key: "lendItems",
      tab: (
        <div
          className={tabIndex === 0 ? "select" : ""}
          onClick={() => setTabIndex(0)}
        >
          빌려준 물건
        </div>
      ),
      content: <RentalStatus />,
    },
    {
      key: "BorrowStatus",
      tab: (
        <div
          className={tabIndex === 1 ? "select" : ""}
          onClick={() => setTabIndex(1)}
        >
          빌린 물건
        </div>
      ),
      content: <BorrowStatus />,
    },
  ];

  return (
    <>
      {/* <StyledLendAndBorrow>
        {tabArray.map((item) => {
          return <StyledRentalBar key={item.key}>{item.tab}</StyledRentalBar>;
        })}
      </StyledLendAndBorrow>
      <StyledRentStatusBox>
        {tabIndex ? <BorrowStatus /> : <RentalStatus />}
      </StyledRentStatusBox> */}

      {/* 모바일   */}
      <StyledLendAndBorrow>
        {tabArray.map((item) => {
          return <StyledRentalBar key={item.key}>{item.tab}</StyledRentalBar>;
        })}
      </StyledLendAndBorrow>
      <StyledMobileRentStatusBox>
        {tabIndex ? <BorrowStatus /> : <RentalStatus />}
      </StyledMobileRentStatusBox>
    </>
  );
};

const StyledLendAndBorrow = styled.div`
  /* border-bottom: 1px solid gray; */
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 50px;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 30px;
  /* border-radius: 5px; */
  animation: rentalBarfadein 0.5s;
  @keyframes rentalBarfadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledRentalBar = styled.a`
  position: relative;
  width: 100px;
  height: 40px;
  line-height: 40px;
  /* background: #000; */
  /* color: #fff; */
  text-align: center;
  font-weight: bold;
  margin: 30px;

  cursor: pointer;
  .select {
    ::after {
      content: "";
      width: 0px;
      height: 0px;
      border-right: 6px solid transparent;
      border-left: 6px solid transparent;
      border-top: 10px solid #47b5ffae;
      position: absolute;
      top: 45px;
      left: 45px;
    }
  }
`;

const StyledRentStatusBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 100%;
  grid-row: 2/4;
  animation: rentalBarfadein 0.5s;
  @keyframes rentalBarfadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledMobileRentStatusBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 100%;
  animation: rentalBarfadein 0.5s;
  @keyframes rentalBarfadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
