import styled from "styled-components";
import { Layout } from "../../components/layout/Layout";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";

export const FirstEvent = () => {
  return (
    <>
      <Desktop>
        <Layout>
          <StyledContainer>
            <StyledImg
              src={require("../../image/eventOne5.png")}
              alt="이벤트포스터"
            />
            <StyledImg
              src={require("../../image/eventOne2.png")}
              alt="이벤트포스터"
            />
            <StyledImg
              src={require("../../image/eventOne3.png")}
              alt="이벤트포스터"
            />
            <StyledImg
              src={require("../../image/eventOne4.png")}
              alt="이벤트포스터"
            />
          </StyledContainer>
        </Layout>
      </Desktop>

      <Mobile>
        <Layout>
          <StyledMobileContainer>
            <StyledMobileImg
              src={require("../../image/eventOne5.png")}
              alt="이벤트포스터"
            />
            <StyledMobileImg
              src={require("../../image/eventOne2.png")}
              alt="이벤트포스터"
            />
            <StyledMobileImg
              src={require("../../image/eventOne3.png")}
              alt="이벤트포스터"
            />
            <StyledMobileImg
              src={require("../../image/eventOne4.png")}
              alt="이벤트포스터"
            />
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
  margin-top: 40px;
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
`;

const StyledImg = styled.img`
  width: 600px;
  height: 600px;
  margin-bottom: 50px;
`;

const StyledMobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 110px 0 65px 0;

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
  width: 380px;
  height: 380px;
  margin-bottom: 50px;
`;
