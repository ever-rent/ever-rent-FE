import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
// import { getYear, getMonth } from "date-fns";

import styled from "styled-components";

export const RangeCalrendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  let startToYaer = startDate?.getFullYear();
  let startToMonth = startDate?.getMonth() + 1;
  let startToDay = startDate?.getDate();
  let endToYear = endDate?.getFullYear();
  let endToMonth = endDate?.getMonth() + 1;
  let endToDay = endDate?.getDate();
  const startDay = `${startToYaer}-${startToMonth}-${startToDay}`;
  const endDay = `${endToYear}-${endToMonth}-${endToDay}`;
  let dateTime = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <StyledDatePickerWrapper>
      <StyledDateSetting>예약 기간을 설정해주세요!</StyledDateSetting>
      <StyledDatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        locale={ko}
        selectsRange
        inline
      />
      <div>
        <StyledRentDays>
          렌탈시작일 : {endDate === null ? startDay : startDay}
        </StyledRentDays>
        <StyledRentDays>
          렌탈종료일 : {endDate === null ? startDay : endDay}
        </StyledRentDays>
        <StyledRentDays>
          렌탈기간 : {endDate === null ? 1 : dateTime}일
        </StyledRentDays>
      </div>
      <StyledSubmitButtonsWrap>
        <StyledSubmitButton>렌탈요청</StyledSubmitButton>
        <StyledCancelButton>취소</StyledCancelButton>
      </StyledSubmitButtonsWrap>
    </StyledDatePickerWrapper>
  );
};

const StyledDatePickerWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 380px;
  border-radius: 20px;
  box-shadow: 0 0 5px 0 rgb(71, 181, 255);

  .react-datepicker {
    background-color: white;
    border-color: rgb(198, 232, 255);
    border-radius: 20px;
  }
  .react-datepicker__navigation-icon--previous::before {
    border-color: white;
  }
  .react-datepicker__navigation-icon--next::before {
    border-color: white;
  }
  .react-datepicker__header {
    font-size: 15px;
    font-weight: bold;
    border-color: rgb(198, 232, 255);
    background-color: rgb(71, 181, 255);
  }
  .react-datepicker__current-month {
    color: white;
  }
  .react-datepicker__day-name {
    color: white;
  }
  .react-datepicker__month {
    margin: 0;
    padding: 0.4rem;

    background-color: rgb(124, 203, 255);
  }

  .react-datepicker__week {
    color: white;
  }
  .react-datepicker__day {
    font-size: 15px;
    font-weight: bold;
    color: white;
  }
  .react-datepicker__day--weekend {
    font-size: 15px;
    font-weight: bold;
    color: rgb(255, 100, 100);
  }
  .react-datepicker__day:hover {
    color: black;
  }
  .react-datepicker__day--in-selecting-range {
    color: white;
    background-color: rgb(49, 176, 255);
  }
  .react-datepicker__day--selected {
    color: white;
    background-color: rgb(49, 176, 255);
  }
  .react-datepicker__day--in-range {
    color: white;
    background-color: rgb(0, 157, 255);
  }
`;
const StyledDateSetting = styled.div``;

const StyledDatePicker = styled(DatePicker)``;

const StyledRentDays = styled.div``;
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
