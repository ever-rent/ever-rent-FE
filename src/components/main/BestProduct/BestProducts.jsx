import React, { useRef } from "react";
import styled from "styled-components";
import { BestProductItem } from "./BestProductItem";
import { Desktop, Mobile } from "../../../Hooks/MideaQuery";

export const BestProducts = () => {
  const dummydata = [
    {
      cateId: "1",
      content: "쌉니",
      id: 1,
      mockUrl:
        "https://dnvefa72aowie.cloudfront.net/origin/article/202210/FB78ABBCE586F6D1F5C3328D31B5C40E489C2FAB9948A1F2F23114C5633EEF36.jpg?q=82&s=300x300&t=crop",
      imgUrlArray: (2)[("85ad39a5517.PNG", "aab13382ae6.png")],
      location: "경기도 용인시",
      mapLocation: "기흥구청",
      memberName: "test1",
      price: "150000",
      productName: "1",
    },
    {
      cateId: "1",
      content: "비싸요",
      id: 2,
      mockUrl:
        "https://dnvefa72aowie.cloudfront.net/origin/article/202210/0779c4eb89fb181468c05bb3557b284963b9bdcb370d79c3c581e3c5f8b8aa38.webp?q=82&s=300x300&t=crop",
      imgUrlArray: (2)[("85ad39a5517.PNG", "aab13382ae6.png")],
      location: "서울시 강남구",
      mapLocation: "기흥구청",
      memberName: "test1",
      price: "350000",
      productName: "1",
    },
    {
      cateId: "1",
      content: "싸게 빌려가세요",
      id: 3,
      mockUrl:
        "https://dnvefa72aowie.cloudfront.net/origin/article/202210/4581E8B8E1FE027F2E0C284437CF1D878292A13F69FE83D38C866FDB5ABF3754.jpg?q=82&s=300x300&t=crop",
      imgUrlArray: (2)[("85ad39a5517.PNG", "aab13382ae6.png")],
      location: "서울시 서대문구",
      mapLocation: "기흥구청",
      memberName: "test1",
      price: "15000",
      productName: "1",
    },
    {
      cateId: "1",
      content: "쌉니",
      id: 4,
      mockUrl:
        "https://dnvefa72aowie.cloudfront.net/origin/article/202210/b87b50190ef6f45140238a24a25fa9781960925be86e40fbed0b001b9cc1b71e.webp?q=82&s=300x300&t=crop",

      imgUrlArray: (2)[("85ad39a5517.PNG", "aab13382ae6.png")],
      location: "경기도 용인시",
      mapLocation: "기흥구청",
      memberName: "test1",
      price: "150000",
      productName: "1",
    },
    {
      cateId: "1",
      content: "쌉니",
      id: 5,
      imgUrlArray: (2)[("85ad39a5517.PNG", "aab13382ae6.png")],
      location: "경기도 용인시",
      mapLocation: "기흥구청",
      memberName: "test1",
      price: "150000",
      productName: "1",
    },
    {
      cateId: "1",
      content: "쌉니",
      id: 6,
      imgUrlArray: (2)[("85ad39a5517.PNG", "aab13382ae6.png")],
      location: "경기도 용인시",
      mapLocation: "기흥구청",
      memberName: "test1",
      price: "150000",
      productName: "1",
    },
    {
      cateId: "1",
      content: "쌉니",
      id: 7,
      imgUrlArray: (2)[("85ad39a5517.PNG", "aab13382ae6.png")],
      location: "경기도 용인시",
      mapLocation: "기흥구청",
      memberName: "test1",
      price: "150000",
      productName: "1",
    },
    {
      cateId: "1",
      content: "쌉니",
      id: 8,
      imgUrlArray: (2)[("85ad39a5517.PNG", "aab13382ae6.png")],
      location: "경기도 용인시",
      mapLocation: "기흥구청",
      memberName: "test1",
      price: "150000",
      productName: "1",
    },
  ];
  // const bestProducts = useSelector((store) => store.product.bestProducts);

  const productsRef = useRef();
  // const productsBox = useRef();

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(getBestProducts());
  // }, []);

  // const allProducts = () => {
  //   navigate("/products");
  // };

  const makeArr = (bestProducts) => {
    let arr = [];
    bestProducts.map((_, idx) => arr.push(idx)); //map 요소(element, index, arr)
    return arr;
  };

  const idxArr = makeArr(dummydata);
  let idx = 0;

  const back = () => {
    const forwardIdx = idxArr[--idx];
    if (forwardIdx === undefined) {
      idx = 0;
      return;
    }
    move(forwardIdx);
  };

  const forward = () => {
    // 한페이지에 보이는 아이템 수: 5
    // if (idx > 4) {
    //   return;
    // } else {
    let backIdx = idxArr[++idx];
    move(backIdx);
    // }
  };

  const move = (idx) => {
    productsRef.current.style.transform = `translateX(${-idx * 212}px)`; // 180(card width)+32(gap)
  };

  return (
    <>
      <Desktop>
        <StyledBestProductsContainer>
          <StyledHotItem>우리 동네 Hot Item</StyledHotItem>
          <StyledItemAndButtonContainer>
            {/* <StyeldMoveButton onClick={back}> */}
            <StyeldMoveButtonLeft onClick={back}>
              <img
                src="https://img.icons8.com/ios/50/5923ff/back--v1.png"
                alt="<"
              />
            </StyeldMoveButtonLeft>
            <StyledContainer>
              <StyledGridBox ref={productsRef}>
                {dummydata.map((item) => {
                  return <BestProductItem item={item} key={item.id} />;
                })}
              </StyledGridBox>
            </StyledContainer>
            {/* <StyeldMoveButton onClick={forward}> */}
            <StyeldMoveButtonRight onClick={forward}>
              <img
                src="https://img.icons8.com/ios/50/5923ff/forward--v1.png"
                alt=">"
              />
            </StyeldMoveButtonRight>
          </StyledItemAndButtonContainer>
        </StyledBestProductsContainer>
      </Desktop>

      <Mobile>
        <></>
      </Mobile>
    </>
  );
};

const StyledBestProductsContainer = styled.div`
  max-width: 1013px;
  margin: auto;
`;

const StyledHotItem = styled.span`
  font-size: 25px;
  font-weight: 500;
  color: #5923ff;
`;

const StyledItemAndButtonContainer = styled.div`
  /* border: 1px solid black; */
  border-radius: 10px;
  display: flex;
  position: relative;
  /* max-width: 1024px; */
  /* margin: auto; */
  /* overflow: hidden; */
  padding: 0 30px;
  margin: 25px 0 60px 0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const StyeldMoveButtonLeft = styled.button`
  border: transparent;
  position: absolute;
  z-index: 2;
  /* font-size: 20px; */
  left: 0;
  top: 40%;
  max-width: max-content;
  background-color: transparent;
  color: #5923ff;
  cursor: pointer;
  /* margin-right: 20px; */
`;

const StyeldMoveButtonRight = styled.button`
  border: transparent;
  position: absolute;
  z-index: 2;
  right: 0;
  top: 40%;
  max-width: max-content;
  background-color: transparent;
  cursor: pointer;
  margin-left: 10px;
`;

const StyledContainer = styled.div`
  /* border: 1px solid red; */
  /* height: 180px; */
  /* max-width: 1024px; */
  margin: 25px 50px;
  padding: 10px 0 10px 16px;
  overflow: hidden;
`;

const StyledGridBox = styled.div`
  display: grid;
  z-index: 1;
  gap: 32px;
  grid-template-columns: repeat(8, 180px);
  transition: 0.6s;
`;
