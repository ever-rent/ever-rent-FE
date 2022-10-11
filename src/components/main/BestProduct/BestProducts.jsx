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
      id: 2,
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
      id: 3,
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
      id: 4,
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
    {
      cateId: "1",
      content: "쌉니",
      id: 9,
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
      id: 10,
      imgUrlArray: (2)[("85ad39a5517.PNG", "aab13382ae6.png")],
      location: "경기도 용인시",
      mapLocation: "기흥구청",
      memberName: "test1",
      price: "150000",
      productName: "1",
    },
  ];
  // const bestProducts = useSelector((store) => store.product.bestProducts);

  const productsRef = useRef;
  // const productsBox = useRef();

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(getBestProducts());
  // }, []);

  // const allProducts = () => {
  //   navigate("/products");
  // };

  function makeArr(bestProducts) {
    let arr = [];
    bestProducts.map((_, idx) => arr.push(idx)); //map 요소(element, index, arr)
    return arr;
  }

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
    if (idx > 4) {
      return;
    } else {
      let backIdx = idxArr[++idx];
      move(backIdx);
    }
  };

  const move = (idx) => {
    productsRef.current.style.transform = `translateX(${-idx * 15}em)`;
  };

  return (
    <>
      <Desktop>
        <p>Today's Hot Item</p>
        <StyledItemAndButtonContainer>
          {/* <StyeldMoveButton onClick={back}> */}
          <StyeldMoveButton onClick={back}>&lt;</StyeldMoveButton>
          <StyledContainer>
            <StyledGridBox>
              <div ref={productsRef}>
                {dummydata.map((item) => {
                  return <BestProductItem item={item} key={item.id} />;
                })}
              </div>
            </StyledGridBox>
          </StyledContainer>
          {/* <StyeldMoveButton onClick={forward}> */}
          <StyeldMoveButton onClick={forward}>&gt;</StyeldMoveButton>
        </StyledItemAndButtonContainer>
      </Desktop>

      <Mobile>
        <></>
      </Mobile>
    </>
  );
};

const StyledItemAndButtonContainer = styled.div`
  border: 1px solid green;

  display: flex;
`;

const StyeldMoveButton = styled.button`
  background-color: transparent;
`;

const StyledContainer = styled.div`
  border: 1px solid green;
  max-width: 1024px;
  margin: 30px auto 70px auto;
`;

const StyledGridBox = styled.div`
  border: 1px solid blue;
  display: grid;
  width: 1024px;
  margin: auto;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  /* column-gap: 40px; */
`;

//dummydata용
const StyledItemBox = styled.div`
  border: 1px solid red;
  padding: 15px 10px 0 10px;
`;

const StyledImg = styled.img`
  width: 150px;
  height: 150px;
  padding-bottom: 10px;
`;

const StyledTitle = styled.div``;

const StyledPayBox = styled.div`
  /* position: absolute;
  bottom: 0; */
`;

const StyledPay = styled.span``;

const StyledDay = styled.span``;

const StyledTimeForToday = styled.span``;
