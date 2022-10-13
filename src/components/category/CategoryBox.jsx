import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";

export const CategoryBox = () => {
  const navigate = useNavigate();

  return (
    <>
      <Desktop>
        <StyledCategoryH2>어떤 물건을 찾고 있나요?</StyledCategoryH2>
        <StyledCategoryBox>
          <StyledKeyWordButton onClick={() => navigate("/categoryDetail/1")}>
            <StyledCategoryImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F0Ei09%2FbtrMkt3aikH%2FKHuEMXcruHUwZF5PiU0zC1%2Fimg.png"
              alt="https://icons8.com/icon/2169/multiple-devices Multiple Devices</a> icon by https://icons8.com"
            />
            <StyledKeyWordName>디지털기기</StyledKeyWordName>
          </StyledKeyWordButton>

          <StyledKeyWordButton onClick={() => navigate("/categoryDetail/2")}>
            <StyledCategoryImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FxantZ%2FbtrMkG2snSo%2FGSsMszSJxprlT1H3onWaK1%2Fimg.png"
              alt="https://icons8.com/icon/ARGuqYp5gd84/toolbox Toolbox</a> icon by https://icons8.com"
            />
            <StyledKeyWordName>공구</StyledKeyWordName>
          </StyledKeyWordButton>

          <StyledKeyWordButton onClick={() => navigate("/categoryDetail/3")}>
            <StyledCategoryImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbY2ql0%2FbtrMjWxXjed%2Fmki0iUHV5bQ1TvK3cwsFh1%2Fimg.png"
              alt="https://icons8.com/icon/xLqAXsDsOHIe/appliances Appliances</a> icon by https://icons8.com"
            />
            <StyledKeyWordName>생활가전</StyledKeyWordName>
          </StyledKeyWordButton>

          <StyledKeyWordButton onClick={() => navigate("/categoryDetail/4")}>
            <StyledCategoryImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbPqfgC%2FbtrMkH1ni36%2FJNSYgpfFKFpBdt04Q60Xhk%2Fimg.png"
              alt="https://icons8.com/icon/tz3NPpBJTT76/bag Bag</a> icon by https://icons8.com"
            />
            <StyledKeyWordName>잡화</StyledKeyWordName>
          </StyledKeyWordButton>

          <StyledKeyWordButton onClick={() => navigate("/categoryDetail/5")}>
            <StyledCategoryImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FchJ0gv%2FbtrMkHmKs27%2FD5BqKMJ0r8H5WtgPkHUQkK%2Fimg.png"
              alt="https://icons8.com/icon/AMKxEjBJw38y/sports Sports</a> icon https://icons8.com"
            />
            <StyledKeyWordName>스포츠/레저</StyledKeyWordName>
          </StyledKeyWordButton>

          <StyledKeyWordButton onClick={() => navigate("/categoryDetail/6")}>
            <StyledCategoryImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcCRpGL%2FbtrMjuV2cls%2FxJP26hbWKrYeulNe40VxZK%2Fimg.png"
              alt="https://icons8.com/icon/JtRYpjtdhzhs/game-controller Game Controller icon by https://icons8.com"
            />
            <StyledKeyWordName>취미/게임/음반</StyledKeyWordName>
          </StyledKeyWordButton>

          <StyledKeyWordButton onClick={() => navigate("/categoryDetail/7")}>
            <StyledCategoryImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcClWfP%2FbtrMnmvejE7%2Fox4bf2buG60CkelvwQxEV0%2Fimg.png"
              alt="https://icons8.com/icon/nt7jrhMPqVjW/storytelling Storytelling icon by https://icons8.com"
            />
            <StyledKeyWordName>도서</StyledKeyWordName>
          </StyledKeyWordButton>
          <StyledKeyWordButton onClick={() => navigate("/categoryDetail/8")}>
            <StyledCategoryImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FImLIT%2FbtrMjEdhqOt%2FyzIK3cunHdoswF8CdKVeBK%2Fimg.png"
              alt="https://icons8.com/icon/5344/medium-priority Medium Priority icon by https://icons8.com"
            />
            <StyledKeyWordName>기타</StyledKeyWordName>
          </StyledKeyWordButton>
        </StyledCategoryBox>
      </Desktop>
      {/* ################ 모바일 ################ */}
      <Mobile>
        <StyledMobileCategoryH2>
          어떤 물건을 찾고 있나요?
        </StyledMobileCategoryH2>
        <StyledMobileCategoryBox>
          <StyledMobileKeyWordButton
            onClick={() => navigate("/categoryDetail/1")}
          >
            <StyledMobileCategoryImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F0Ei09%2FbtrMkt3aikH%2FKHuEMXcruHUwZF5PiU0zC1%2Fimg.png"
              alt="https://icons8.com/icon/2169/multiple-devices Multiple Devices</a> icon by https://icons8.com"
            />
            <StyledMobileKeyWordName>디지털기기</StyledMobileKeyWordName>
          </StyledMobileKeyWordButton>

          <StyledMobileKeyWordButton
            onClick={() => navigate("/categoryDetail/2")}
          >
            <StyledMobileCategoryImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FxantZ%2FbtrMkG2snSo%2FGSsMszSJxprlT1H3onWaK1%2Fimg.png"
              alt="https://icons8.com/icon/ARGuqYp5gd84/toolbox Toolbox</a> icon by https://icons8.com"
            />
            <StyledMobileKeyWordName>공구</StyledMobileKeyWordName>
          </StyledMobileKeyWordButton>

          <StyledMobileKeyWordButton
            onClick={() => navigate("/categoryDetail/3")}
          >
            <StyledMobileCategoryImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbY2ql0%2FbtrMjWxXjed%2Fmki0iUHV5bQ1TvK3cwsFh1%2Fimg.png"
              alt="https://icons8.com/icon/xLqAXsDsOHIe/appliances Appliances</a> icon by https://icons8.com"
            />
            <StyledMobileKeyWordName>생활가전</StyledMobileKeyWordName>
          </StyledMobileKeyWordButton>

          <StyledMobileKeyWordButton
            onClick={() => navigate("/categoryDetail/4")}
          >
            <StyledMobileCategoryImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbPqfgC%2FbtrMkH1ni36%2FJNSYgpfFKFpBdt04Q60Xhk%2Fimg.png"
              alt="https://icons8.com/icon/tz3NPpBJTT76/bag Bag</a> icon by https://icons8.com"
            />
            <StyledMobileKeyWordName>잡화</StyledMobileKeyWordName>
          </StyledMobileKeyWordButton>

          <StyledMobileKeyWordButton
            onClick={() => navigate("/categoryDetail/5")}
          >
            <StyledMobileCategoryImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FchJ0gv%2FbtrMkHmKs27%2FD5BqKMJ0r8H5WtgPkHUQkK%2Fimg.png"
              alt="https://icons8.com/icon/AMKxEjBJw38y/sports Sports</a> icon https://icons8.com"
            />
            <StyledMobileKeyWordName>스포츠/레저</StyledMobileKeyWordName>
          </StyledMobileKeyWordButton>

          <StyledMobileKeyWordButton
            onClick={() => navigate("/categoryDetail/6")}
          >
            <StyledMobileCategoryImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcCRpGL%2FbtrMjuV2cls%2FxJP26hbWKrYeulNe40VxZK%2Fimg.png"
              alt="https://icons8.com/icon/JtRYpjtdhzhs/game-controller Game Controller icon by https://icons8.com"
            />
            <StyledMobileKeyWordName>취미/게임/음반</StyledMobileKeyWordName>
          </StyledMobileKeyWordButton>

          <StyledMobileKeyWordButton
            onClick={() => navigate("/categoryDetail/7")}
          >
            <StyledMobileCategoryImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcClWfP%2FbtrMnmvejE7%2Fox4bf2buG60CkelvwQxEV0%2Fimg.png"
              alt="https://icons8.com/icon/nt7jrhMPqVjW/storytelling Storytelling icon by https://icons8.com"
            />
            <StyledMobileKeyWordName>도서</StyledMobileKeyWordName>
          </StyledMobileKeyWordButton>
          <StyledMobileKeyWordButton
            onClick={() => navigate("/categoryDetail/8")}
          >
            <StyledMobileCategoryImg
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FImLIT%2FbtrMjEdhqOt%2FyzIK3cunHdoswF8CdKVeBK%2Fimg.png"
              alt="https://icons8.com/icon/5344/medium-priority Medium Priority icon by https://icons8.com"
            />
            <StyledMobileKeyWordName>기타</StyledMobileKeyWordName>
          </StyledMobileKeyWordButton>
        </StyledMobileCategoryBox>
      </Mobile>
    </>
  );
};

const StyledCategoryH2 = styled.h2`
  margin-top: 100px;
  text-align: center;
`;

const StyledCategoryBox = styled.div`
  margin-top: 50px;
  margin-bottom: 30px;

  display: grid;
  justify-content: center;
  align-items: center;
  justify-items: center;

  grid-template-rows: 200px 200px;
  grid-template-columns: 200px 200px 200px 200px;

  animation: categoriFadein 1.2s;
  & {
    @keyframes categoriFadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const StyledKeyWordButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 130px;
  height: 130px;
  border: none;
  border-radius: 30px;
  background-color: transparent;
  box-shadow: 0 0 2px 0 rgb(71, 181, 255);

  cursor: pointer;
  &:hover {
    box-shadow: 0 0 5px 0 rgb(71, 181, 255);
    transition: box-shadow 0.1s ease-in-out 0s;
  }
`;

const StyledCategoryImg = styled.img`
  width: 50px;
  height: 50px;
`;

const StyledKeyWordName = styled.span`
  margin-top: 20px;
`;

// for Mobile
const StyledMobileCategoryH2 = styled.h2`
  margin-top: 60px;
  text-align: center;
  font-size: 20px;
`;

const StyledMobileCategoryBox = styled.div`
  margin-top: 50px;

  display: grid;
  justify-content: center;
  align-items: center;
  justify-items: center;

  grid-template-rows: 100px 100px;
  grid-template-columns: 100px 100px 100px 100px;

  animation: categoriFadein 1.2s;
  & {
    @keyframes categoriFadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const StyledMobileKeyWordButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 80px;
  height: 80px;
  border: none;
  border-radius: 20px;
  background-color: transparent;
  box-shadow: 0 0 2px 0 rgb(71, 181, 255);

  cursor: pointer;
  &:hover {
    box-shadow: 0 0 5px 0 rgb(71, 181, 255);
    transition: box-shadow 0.1s ease-in-out 0s;
  }
`;

const StyledMobileCategoryImg = styled.img`
  width: 35px;
  height: 35px;
`;

const StyledMobileKeyWordName = styled.span`
  margin-top: 20px;
  font-size: 10px;
`;
