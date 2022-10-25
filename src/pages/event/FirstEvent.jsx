import styled from "styled-components";
import { Layout } from "../../components/layout/Layout";

export const FirstEvent = () => {
  return (
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
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

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
