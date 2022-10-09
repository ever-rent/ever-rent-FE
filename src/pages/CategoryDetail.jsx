import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../components/layout/Layout";
import { getCategory } from "../redux/modules/productSlice";
import { DetailItem } from "../components/detail/DetailItem";

import { useInView } from "react-intersection-observer";
import { base } from "../server/core/instance"; // 리팩토링 예정
import axios from "axios";

export const CategoryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const dispatch = useDispatch();
  // const category = useSelector((state) => state.products.category);
  // const categoryItems = category?.data;
  // console.log(categoryItems);

  // useEffect(() => {
  //   dispatch(getCategory(id));
  // }, [dispatch, id]);

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
    // const categoryId = e.target.value;
    // dispatch(getCategory(categoryId));
    // console.log(e.target.value);

    // infi
    page.current = 1;
    console.log(page);
    setCategoryItems([]);
    console.log(e.target.value);
    navigate(`/categoryDetail/${e.target.value}`);
    // setCategoryId(e.target.value)
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

  // infi scroll

  const [isLoading, setIsLoading] = useState(false);

  // 카테고리 id 파라미터
  const [categoryId, setCategoryId] = useState(id);

  // 현재 state 데이터 , 다음페이지 이동 여부,
  // 현재페이지, observer 뷰 교차 여부
  const [categoryItems, setCategoryItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const page = useRef(1);
  const [ref, inView] = useInView(true);

  // 다음 구간 데이터 패치 함수
  const fetch = useCallback(async () => {
    try {
      const { data } = await base.get(
        `http://13.209.8.18/categories/${id}?page=${page.current}`
      );
      setCategoryItems((prevPosts) => [...prevPosts, ...data.data]);
      setHasNextPage(data.data.length === 12);
      if (data.data.length) {
        page.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    setCategoryItems([]);
  }, []);

  // 데이터 패치 처리
  useEffect(() => {
    setIsLoading(true);
    console.log(inView, hasNextPage);
    if (inView && hasNextPage) {
      setTimeout(() => {
        fetch();
      }, 500);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [fetch, hasNextPage, inView, page]);

  console.log(categoryItems);

  return (
    <Layout>
      <StyledCategoryContainer>
        <StyledSelectBox>
          <StyledSelect onChange={categoryHandler} defaultValue={id}>
            {categoryList?.map((option, index) => {
              if (index === 0) {
                return (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={true}
                  >
                    {option.name}
                  </option>
                );
              } else {
                return (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                );
              }
            })}
          </StyledSelect>

          {/* <StyledSelect onChange={addressHandler}>
            {addressList?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </StyledSelect> */}

          <StyledSelect onChange={priceHandler}>
            {priceList?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </StyledSelect>
        </StyledSelectBox>

        <StyledDetailContainer>
          {categoryItems?.map((item) => {
            return <DetailItem {...item} key={item.id} />;
          })}
        </StyledDetailContainer>
      </StyledCategoryContainer>
      <div ref={ref} style={{ position: "relative" }} />
      {isLoading === true ? (
        <StyledSpinner>
          <span className="spinner"></span>
        </StyledSpinner>
      ) : null}
    </Layout>
  );
};

const StyledCategoryContainer = styled.div`
  max-width: 1024px;
  margin: 40px auto;
`;

const StyledDetailContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 226px);
  margin-top: 30px;
  gap: 50px 40px;
  @media only screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
  }
`;
const StyledSelectBox = styled.div`
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

const StyledSpinner = styled.div`
  /* display: none; */
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  & .spinner {
    box-sizing: border-box;
    position: fixed;
    bottom: 200px;
    left: 50%;
    width: 64px;
    height: 64px;
    margin-top: -32px;
    margin-left: -32px;
    border-radius: 50%;
    border: 8px solid transparent;
    border-top-color: rgb(71, 181, 255);
    border-bottom-color: rgb(71, 181, 255);
    animation: spinner 0.7s ease infinite;

    @keyframes spinner {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;
