import styled from "styled-components";
import { Layout } from "../../components/layout/Layout";

export const SecondEvent = () => {
  return (
    <Layout>
      <StyledContainer>
        <StyledImg
          src={require("../../image/eventTwo3.png")}
          alt="이벤트포스터"
        />
        <StyledImg
          src={require("../../image/eventTwo2.png")}
          alt="이벤트포스터"
        />
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSe6cqZrXCUhTOFmYXWtTtIfj1-JfI8qoCPIXlKG8nPCi7PCmA/viewform"
          target="_blank"
        >
          <StyledButton>설문 참여하기</StyledButton>
        </a>
        <p>설문조사는 참여하실 수 있지만</p>
        <p>죄송하게도 본 이벤트는 조기 마감되었습니다.</p>
        <p>이점 양해 부탁드리겠습니다.</p>
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
  & a:link,
  a:visited,
  a:active {
    text-decoration-line: none;
  }
`;

const StyledImg = styled.img`
  width: 700px;
  height: 600px;
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
