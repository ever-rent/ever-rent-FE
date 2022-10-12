import React, { useState } from "react";
import styled from "styled-components";
import { RentalStatus } from "./RentalStatus";
import { BorrowStatus } from "./BorrowStatus";
// import { StatusBox } from "./StatusBox";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";

export const RentalBar = ({ like }) => {
  const [tabIndex, setTabIndex] = useState(0); //처음에 나오는 것이 빌려준 물건.
  console.log("RentalBar>>", like);

  const tabArray = [
    {
      key: "lendItems",
      tab: (
        <StyledTabArray
          className={tabIndex === 0 ? "select" : ""}
          onClick={() => setTabIndex(0)}
        >
          빌려준 물건
        </StyledTabArray>
      ),
      content: <RentalStatus />,
    },
    {
      key: "BorrowStatus",
      tab: (
        <StyledTabArray
          className={tabIndex === 1 ? "select" : ""}
          onClick={() => setTabIndex(1)}
        >
          빌린 물건
        </StyledTabArray>
      ),
      content: <BorrowStatus />,
    },
  ];

  return (
    <>
      <Desktop>
        <StyledRentalBarContainer>
          <StyledLendAndBorrow>
            {tabArray.map((item) => {
              return (
                <StyledRentalBar key={item.key}>{item.tab}</StyledRentalBar>
              );
            })}
          </StyledLendAndBorrow>
          <StyledRentStatusBox>
            {tabIndex ? <BorrowStatus /> : <RentalStatus />}
          </StyledRentStatusBox>
        </StyledRentalBarContainer>
      </Desktop>
      {/* ################ 모바일 ################ */}
      <Mobile>
        <StyledLendAndBorrow>
          {tabArray.map((item) => {
            return <StyledRentalBar key={item.key}>{item.tab}</StyledRentalBar>;
          })}
        </StyledLendAndBorrow>
        <StyledMobileRentStatusBox>
          {tabIndex ? <BorrowStatus /> : <RentalStatus />}
        </StyledMobileRentStatusBox>
      </Mobile>
    </>
  );
};

const StyledTabArray = styled.div``;

const StyledRentalBarContainer = styled.div``;
const StyledLendAndBorrow = styled.div`
  /* border-bottom: 1px solid gray; */
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 50px;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 30px;
  /* border-radius: 5px; */
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
  transition: 0.6s;

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

const StyledRentStatusBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  border-radius: 5px;
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  height: 100%;
  grid-row: 2/4;
  /* transition: 0.6s; */
`;

const StyledMobileRentStatusBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 100%;
  /* animation: rentalBarfadein 0.5s;
  @keyframes rentalBarfadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  } */
`;
