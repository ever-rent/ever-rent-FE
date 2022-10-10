import styled from "styled-components";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";

export const SkeletonItem = () => {
  return (
    <>
      <Desktop>
        <StyledItemBox>
          <StyledImgBox>
            <StyledImg />
          </StyledImgBox>
          <StyledContentBox>
            <StyledSkeletonSpan></StyledSkeletonSpan>
            <StyledSkeletonSpan></StyledSkeletonSpan>
            <StyledSkeletonSpan></StyledSkeletonSpan>
          </StyledContentBox>
        </StyledItemBox>
      </Desktop>
      {/* ################ 모바일 ################ */}
      <Mobile>
        <StyledMobileItemBox>
          <StyledMobileImgBox>
            <StyledImg />
          </StyledMobileImgBox>
          <StyledContentBox></StyledContentBox>
        </StyledMobileItemBox>
      </Mobile>
    </>
  );
};

const StyledItemBox = styled.div`
  height: 312px;
  padding: 10px 10px 0 10px;
  position: relative;
  border-radius: 10px;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee6e 100%);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  & {
    animation: skeletonInfi 1s ease-in-out infinite;
    @keyframes skeletonInfi {
      from {
        opacity: 0.7;
        box-shadow: rgba(0, 0, 0, 0.24) 1px 3px 4px;
      }
      50% {
        opacity: 1;
        box-shadow: rgba(0, 0, 0, 0.24) 5px 2px 5px;
      }
      to {
        opacity: 0.7;
        box-shadow: rgba(0, 0, 0, 0.24) 1px 3px 4px;
      }
    }
  }
`;

const StyledContentBox = styled.div`
  margin: 12px 0;
  width: 100px;
  height: 100px;
  & {
    animation: skeletonSpan 1s ease-in-out infinite;
    @keyframes skeletonSpan {
      from {
        opacity: 0.7;
        border: #d3d3d3;
      }
      50% {
        opacity: 1;
        border: #242424;
      }
      to {
        opacity: 0.7;
        border: #d3d3d3;
      }
    }
  }
`;

const StyledSkeletonSpan = styled.div`
  width: 100px;
  height: 100px;
`;

const StyledImgBox = styled.div`
  padding: 2px;
  width: 200px;
  height: 140px;
  margin-bottom: 3px;
`;

const StyledImg = styled.div`
  border-radius: 8px;
  border: 1px solid #d3d3d3;
  width: 100%;
  height: 100%;
`;

// Mobile

const StyledMobileItemBox = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #c7c6c6bc;
  padding: 10px 10px 0 10px;
  position: relative;
  background-image: linear-gradient(120deg, #ffffff 0%, #ebedee6e 100%);
  display: flex;
  background-color: white;
  padding: 0;
  align-items: center;

  & {
    animation: skeletonInfi 1s ease-in-out infinite;
    @keyframes skeletonInfi {
      from {
        opacity: 0.7;
        box-shadow: rgba(0, 0, 0, 0.24) 4px 3px 4px;
      }
      50% {
        opacity: 1;
        box-shadow: rgba(0, 0, 0, 0.24) 5px 2px 5px;
      }
      to {
        opacity: 0.7;
        box-shadow: rgba(0, 0, 0, 0.24) 4px 3px 4px;
      }
    }
  }
`;

const StyledMobileImgBox = styled.div`
  padding: 2px;
  width: 200px;
  height: 140px;
  margin: 5px 15px 5px 3px;
`;
