import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
// import { getYear, getMonth } from "date-fns";

import styled from "styled-components";

export const RangeCalrendar = ({ startEndDays }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [readOnly, setReadOnly] = useState(false);

  const onChange = (dates) => {
    const [start, end] = dates;
    startEndDays(start, end);
    setStartDate(start);
    setEndDate(end);
  };

  let startToYaer = startDate?.getFullYear();
  let startToMonth = startDate?.getMonth() + 1;
  let startToDay = startDate?.getDate();
  let endToYear = endDate?.getFullYear();
  let endToMonth = endDate?.getMonth() + 1;
  let endToDay = endDate?.getDate();
  const startDay = `${startToYaer}년 ${startToMonth}월 ${startToDay}일`;
  const endDay = `${endToYear}년 ${endToMonth}월 ${endToDay}일`;
  let dateTime = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <StyledDatePickerWrapper>
      <StyledDateSetting>
        예약 기간을 설정해주세요!<StyledWriteOnly>*</StyledWriteOnly>
      </StyledDateSetting>
      <StyledDatePicker
        withPortal
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        locale={ko}
        selectsRange
        dateFormat="yy년MM월dd일"
        minDate={new Date()}
        showDisabledMonthNavigation
        placeholderText="00년00월00일-년00월00일"
      />
      <StyledDaysWrap>
        <StyledRentDays>
          렌탈시작일 : {startDay.length > 14 ? "-" : startDay}
        </StyledRentDays>
        <StyledRentDays>
          렌탈종료일 : {endDay.length > 14 ? "-" : endDay}
        </StyledRentDays>
        <StyledRentDays>
          렌탈기간 : {endDate === null ? 1 : dateTime}일
        </StyledRentDays>
      </StyledDaysWrap>
      {/* <StyledSubmitButtonsWrap>
        <StyledSubmitButton>렌탈요청</StyledSubmitButton>
        <StyledCancelButton>취소</StyledCancelButton>
      </StyledSubmitButtonsWrap> */}
    </StyledDatePickerWrapper>
  );
};

const StyledDatePickerWrapper = styled.section`
  margin-top: 50px;
  
  .react-datepicker {
  }

  .react-datepicker__navigation-icon--previous::before {
    border-color: #aaaaaa;
  }
  .react-datepicker__navigation-icon--next::before {
    border-color: #aaaaaa;
  }
  .react-datepicker__input-container {
    margin-top: 10px;
  }
  .react-datepicker__input-container input {
    width: 220px;
    height: 40px;
    text-align: center;
    border-radius: 20px;
    border: none;
    border: 1px solid rgb(71, 181, 255);
    cursor: pointer;
  }

  .react-datepicker__header {
    font-size: 15px;
    font-weight: bold;
    border-color: rgb(238, 238, 238);
    /* background-color: rgb(71, 181, 255); */
    background-color: white;
  }
  .react-datepicker__current-month {
    color: black;
  }
  /* .react-datepicker__day-name {
    color: black;
  } */
  .react-datepicker__month {
    margin: 0;
    padding: 0.4rem;

    /* background-color: rgb(124, 203, 255); */
    background-color: white;
  }

  .react-datepicker__week {
    color: black;
  }

  .react-datepicker__day {
    font-size: 15px;
    font-weight: bold;
    color: #555555;
    border-radius: 30px;
  }
  .react-datepicker__day--keyboard-selected {
    border-radius: 50px;
  }
  .react-datepicker__day--disabled {
    color: #dbdbdb;
    background-color: white;
  }
  .react-datepicker__day--weekend {
    font-size: 15px;
    font-weight: bold;
    color: rgb(255, 124, 124);
  }
  .react-datepicker__day:hover {
    color: black;
  }
  .react-datepicker__day--in-selecting-range {
    color: white;
    background-color: rgb(157, 217, 255);
  }
  .react-datepicker__day--selected {
    color: white;
    background-color: rgb(49, 176, 255);
  }
  .react-datepicker__day--in-range {
    color: white;
    background-color: rgb(140, 211, 255);
  }
  .react-datepicker__day--keyboard-selected{
    background-color: rgb(49, 176, 255);
    &:hover{
      color:white;
    }
  }
`;
const StyledDateSetting = styled.div``;

const StyledDatePicker = styled(DatePicker)``;

const StyledRentDays = styled.div``;

const StyledDaysWrap = styled.div`
  margin-top: 30px;
`;

const StyledSubmitButtonsWrap = styled.div`
  display: flex;
`;

const StyledSubmitButton = styled.button`
  width: 80px;
  height: 25px;
  border: none;
  border-radius: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;

  color: white;
  background-color: rgb(71, 181, 255);
`;
const StyledCancelButton = styled.button`
  width: 80px;
  height: 25px;
  border: none;
  border-radius: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;

  background-color: white;
  border: 1px solid rgb(71, 181, 255);
  border-radius: 10px;
  color: rgb(71, 181, 255);
  &:hover {
    color: white;
    background-color: rgb(71, 181, 255);
    transition: color 0.1s ease-in-out 0s;
    transition: background-color 0.1s ease-in-out 0s;
  }
`;

const StyledWriteOnly = styled.span`
  margin-left: 10px;
  color: red;
`;
