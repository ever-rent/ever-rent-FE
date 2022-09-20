import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../components/layout/Layout";
import { getCategory } from "../redux/modules/productSlice";
import { DetailItem } from "../components/detail/DetailItem";
// import { Products } from "../components/main/products/Products";
// import { ProductsItem } from "../components/main/products/ProductsItem";

export const CategoryDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.products.category);
  const categoryItems = category?.data;
  console.log(categoryItems);

  useEffect(() => {
    dispatch(getCategory(id));
  }, [dispatch, id]);

  const categoryList = [
    { value: "0", name: "카테고리를 선택하세요" },
    { value: "1", name: "디지털기기" },
    { value: "2", name: "공구" },
    { value: "3", name: "생활가전" },
    { value: "4", name: "잡화" },
    { value: "5", name: "스포츠/레저" },
    { value: "6", name: "취미/게임/음반" },
    { value: "7", name: "도서" },
    { value: "8", name: "기타" },
  ];

  const addressList = [
    { value: "0", name: "지역을 선택하세요" },
    { value: "1", name: "서울특별시" },
    { value: "2", name: "부산광역시" },
    { value: "3", name: "대구광역시" },
    { value: "4", name: "인천광역시" },
    { value: "5", name: "광주광역시" },
    { value: "6", name: "대전광역시" },
    { value: "7", name: "울산광역시" },
    { value: "8", name: "세종특별자치시" },
    { value: "9", name: "경기도" },
    { value: "10", name: "강원도" },
    { value: "11", name: "충청북도" },
    { value: "12", name: "충청남도" },
    { value: "13", name: "전라북도" },
    { value: "14", name: "전라남도" },
    { value: "15", name: "경상북도" },
    { value: "16", name: "경상남도" },
    { value: "17", name: "제주특별자치도" },
  ];

  const priceList = [
    { value: 0, name: "가격을 선택하세요" },
    { value: 1, name: "~ 10,000원 미만" },
    { value: 2, name: "10,000원 ~ 20,000원 미만" },
    { value: 3, name: "20,000원 ~ 30,000원 미만" },
    { value: 4, name: "30,000원 ~ 40,000원 미만" },
    { value: 5, name: "40,000원 ~ 50,000원 미만" },
    { value: 6, name: "50,000원 이상" },
  ];

  const categoryHandler = (e) => {
    e.preventDefault();
    const categoryId = e.target.value;
    dispatch(getCategory(categoryId));
    // console.log(e.target.value);
  };

  const addressHandler = (e) => {
    e.preventDefault();
    // const addressPayload = e.target.value;
    // dispatch(getCategoryDetail(addressPayload));
    // console.log(e.target.value);
  };

  const priceHandler = (e) => {
    e.preventDefault();
    // const pricePayload = e.target.value;
    // dispatch(getCategoryDetail(pricePayload));
    // console.log(e.target.value);
  };

  // useEffect(() => {
  //   dispatch();
  // });

  return (
    <Layout>
      <StyledSelectBox>
        <StyledSelect onChange={categoryHandler}>
          {categoryList?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect onChange={addressHandler}>
          {addressList?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </StyledSelect>

        <StyledSelect onChange={priceHandler}>
          {priceList?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </StyledSelect>
      </StyledSelectBox>
      {categoryItems?.map((item) => {
        return <DetailItem {...item} key={item.id} />;
      })}
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
