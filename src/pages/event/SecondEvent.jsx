import styled from "styled-components";
import { Layout } from "../../components/layout/Layout";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";

export const SecondEvent = () => {
  return (
    <>
      <Desktop>
        <Layout>
          <StyledContainer>
            <StyledImg
              src={require("../../image/eventTwo3.png")}
              alt="이벤트포스터"
            />
            <StyledImg2
              src={require("../../image/eventTwo2.png")}
              alt="이벤트포스터"
            />
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSe6cqZrXCUhTOFmYXWtTtIfj1-JfI8qoCPIXlKG8nPCi7PCmA/viewform">
              <StyledButton>설문 참여하기</StyledButton>
            </a>
            <p>설문조사는 참여하실 수 있지만</p>
            <p>죄송하게도 본 이벤트는 조기 마감되었습니다.</p>
            <p>이점 양해 부탁드리겠습니다.</p>
          </StyledContainer>
        </Layout>
      </Desktop>
      {/* ################ 모바일 ################ */}
      <Mobile>
        <Layout>
          <StyledMobileContainer>
            <StyledMobileImg
              src={require("../../image/eventTwo3.png")}
              alt="이벤트포스터"
            />
            <StyledMobileImg2
              src={require("../../image/eventTwo2.png")}
              alt="이벤트포스터"
            />
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSe6cqZrXCUhTOFmYXWtTtIfj1-JfI8qoCPIXlKG8nPCi7PCmA/viewform">
              <StyledButton>설문 참여하기</StyledButton>
            </a>
            <p>설문조사는 참여하실 수 있지만</p>
            <p>죄송하게도 본 이벤트는 조기 마감되었습니다.</p>
            <p>이점 양해 부탁드리겠습니다.</p>
          </StyledMobileContainer>
        </Layout>
      </Mobile>
    </>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;

  animation: event1 0.4s;
  & {
    @keyframes event1 {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
  & a:link,
  a:visited,
  a:active {
    text-decoration-line: none;
  }
`;

const StyledImg = styled.img`
  width: 660px;
  height: 580px;
  margin-bottom: 50px;
`;

const StyledImg2 = styled.img`
  width: 490px;
  height: 666px;
  margin-bottom: 50px;
`;

const StyledButton = styled.button`
  width: 150px;
  height: 40px;
  margin-left: 25px;
  margin-right: 25px;
  background-color: rgb(71, 181, 255);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const StyledMobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0 65px 0;

  animation: event1 0.4s;
  & {
    @keyframes event1 {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
  & a:link,
  a:visited,
  a:active {
    text-decoration-line: none;
  }
`;

const StyledMobileImg = styled.img`
  width: 400px;
  height: 380px;
  margin: 80px 0 50px 0;
`;

const StyledMobileImg2 = styled.img`
  width: 360px;
  height: 545px;
  margin-bottom: 50px;
`;
