import React from "react";
import styled from "styled-components";
import { Layout } from "../components/layout/Layout";
import { Products } from "../components/main/products/Products";

export const CategoryDetail = () => {
  const categoryList = [
    { value: "", name: "카테고리를 선택하세요" },
    { value: "디지털기기", name: "디지털기기" },
    { value: "공구", name: "공구" },
    { value: "생활가전", name: "디지털기기" },
    { value: "잡화", name: "잡화" },
    { value: "스포츠/레저", name: "스포츠/레저" },
    { value: "취미/게임/음반", name: "취미/게임/음반" },
    { value: "도서", name: "도서" },
    { value: "기타", name: "기타" },
  ];

  const addressList = [
    { value: "", name: "지역을 선택하세요" },
    { value: "서울특별시", name: "서울특별시" },
    { value: "부산광역시", name: "부산광역시" },
    { value: "대구광역시", name: "대구광역시" },
    { value: "인천광역시", name: "인천광역시" },
    { value: "광주광역시", name: "광주광역시" },
    { value: "대전광역시", name: "대전광역시" },
    { value: "울산광역시", name: "울산광역시" },
    { value: "세종특별자치시", name: "세종특별자치시" },
    { value: "경기도", name: "경기도" },
    { value: "강원도", name: "강원도" },
    { value: "충청북도", name: "충청북도" },
    { value: "충청남도", name: "충청남도" },
    { value: "전라북도", name: "전라북도" },
    { value: "전라남도", name: "전라남도" },
    { value: "경상북도", name: "경상북도" },
    { value: "경상남도", name: "경상남도" },
    { value: "제주특별자치도", name: "제주특별자치도" },
  ];

  const priceList = [
    { value: "", name: "가격을 선택하세요" },
    { value: "0", name: "~ 10,000원 미만" },
    { value: "1", name: "10,000원 ~ 20,000원 미만" },
    { value: "2", name: "20,000원 ~ 30,000원 미만" },
    { value: "3", name: "30,000원 ~ 40,000원 미만" },
    { value: "4", name: "40,000원 ~ 50,000원 미만" },
    { value: "5", name: "50,000원 이상" },
  ];

  return (
    <Layout>
      <StyledSelectBox>
        <StyledSelect>
          {categoryList.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect>
          {addressList.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </StyledSelect>

        <StyledSelect>
          {priceList.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </StyledSelect>
      </StyledSelectBox>

      <Products />
    </Layout>
  );
};

const StyledSelectBox = styled.div`
  /* border: 1px solid blue; */
  margin: 10px 0;
`;
const StyledSelect = styled.select`
  border: 2px solid #5fafe4;
  width: 200px;
  padding: 7px;
  margin: 15px 30px 30px 0;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 3px 0 rgb(71, 181, 255);
    transition: box-shadow 0.1s ease-in-out 0s;
  }
`;
