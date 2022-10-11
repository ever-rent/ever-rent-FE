import styled from "styled-components";

import { Layout } from "../layout/Layout";
import { Skeleton } from "../skeleton/Skeleton";
import { ProductsItem } from "../main/products/ProductsItem";

import { Desktop, Mobile } from "../../Hooks/MideaQuery";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productAPI } from "../../server/api";

export const SearchItems = () => {
  const navigate = useNavigate();
  const param = useParams();

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

  const priceList = [
    { value: 0, name: "가격을 선택하세요" },
    { value: 1, name: "~ 10,000원 미만" },
    { value: 2, name: "10,000원 ~ 20,000원 미만" },
    { value: 3, name: "20,000원 ~ 30,000원 미만" },
    { value: 4, name: "30,000원 ~ 40,000원 미만" },
    { value: 5, name: "40,000원 ~ 50,000원 미만" },
    { value: 6, name: "50,000원 이상" },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [categoryNumber, setCategoryNumber] = useState(0);
  const [priceNumber, setPriceNumber] = useState(0);
  const [searchData, setSearchData] = useState();

  console.log(param.id);
  const fetchData = async () => {
    await productAPI.getSearch(param.id).then((response) => {
      setSearchData(response.data.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log("패치", searchData);

  const categoryHandler = (e) => {
    setCategoryNumber(e.target.value);
  };
  const priceHandler = (e) => {
    setPriceNumber(e.target.value);
  };

  const initOptions = () => {
    setCategoryNumber(0);
    setPriceNumber(0);
  };

  const productsData = searchData?.filter((element) => element);

  const [products, setProducts] = useState([]);


  let dataTest = searchData;
  useEffect(() => {
    setIsLoading(true)
    if (categoryNumber === 0) {
      setProducts(
        priceNumber === 0
          ? searchData
          : (dataTest = searchData?.filter(
              (element) => element.cateId === categoryNumber
            ))
      );
    }
    if (categoryNumber !== 0) {
      if (priceNumber === 0) {
        setProducts(
          searchData?.filter((element) => element.cateId === categoryNumber)
        );
      } else if (priceNumber === "1") {
        setProducts(
          searchData?.filter(
            (element) =>
              (element.cateId === categoryNumber) &
              (Number(element.price) < 10000)
          )
        );
      } else if (priceNumber === "6") {
        setProducts(
          searchData?.filter(
            (element) =>
              (element.cateId === categoryNumber) &
              (Number(element.price) < 50000)
          )
        );
      } else {
        setProducts(
          searchData?.filter(
            (element) =>
              (element.cateId === categoryNumber) &
              (priceNumber * 10000 - 10000 <= Number(element.price)) &
              (Number(element.price) < priceNumber * 10000)
          )
        );
      }
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 700);
  }, [categoryNumber, priceNumber]);

  console.log("products", products);
  console.log("카테", categoryNumber, "가격", priceNumber);

  return (
    <>
      <Desktop>
        <Layout>
          <StyledProductsContainer>
            <StyledSelectBox>
              <StyledSelect
                onChange={(e) => categoryHandler(e)}
                defaultChecked={0}
                value={categoryNumber}
              >
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
              <StyledSelect
                onChange={(e) => priceHandler(e)}
                defaultChecked={0}
                value={`${priceNumber}`}
                // 임시 제거
                style={{ display: "none" }}
              >
                {priceList?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </StyledSelect>
              <span onClick={initOptions}>검색조건 초기화</span>
            </StyledSelectBox>
            <span>다음으로 검색된 목록 : {param.id}</span>
            {isLoading ? (
              <>
                <Skeleton />
              </>
            ) : (
              <StyledProductsGrid>
                {products?.map((product) => {
                  return <ProductsItem {...product} key={product.id} />;
                })}
              </StyledProductsGrid>
            )}
          </StyledProductsContainer>
        </Layout>
      </Desktop>
      {/* ################ 모바일 ################ */}
      <Mobile></Mobile>
    </>
  );
};

const StyledProductsContainer = styled.div`
  max-width: 1024px;
  margin: 40px auto;
`;

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 226px);
  margin-top: 30px;
  gap: 50px 40px;
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

// for Mobile
const StyledMobileContainer = styled.div`
  /* border: 1px solid red; */
  max-width: 400px;
  margin: auto;
  margin-bottom: 90px;
  padding: 20px;
`;

const StyledMobileProducts = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;
