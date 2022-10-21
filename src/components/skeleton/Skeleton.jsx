import { SkeletonItem } from "./SkeletonItem";
import { Desktop, Mobile } from "../../Hooks/MideaQuery";
import styled from "styled-components";

export const Skeleton = () => {
  return (
    <>
      <Desktop>
        <StyledSkeletonContainer>
          <StyledSkeletonGrid>
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
          </StyledSkeletonGrid>
        </StyledSkeletonContainer>
      </Desktop>
      <Mobile>
        <StyledMobileContainer>
          <StyledMobileSkeleton>
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
          </StyledMobileSkeleton>
        </StyledMobileContainer>
      </Mobile>
    </>
  );
};

const StyledSkeletonContainer = styled.div`
  /* max-width: 1024px; */
  max-width: 920px;
  margin: 40px auto;

  & {
    animation: skeletonfadein 0.8s;
    @keyframes skeletonfadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const StyledSkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  margin-top: 30px;
  gap: 50px 40px;
`;

// Mobile

const StyledMobileContainer = styled.div`
  max-width: 480px;
  margin: auto;
  margin-bottom: 90px;
  /* padding: 20px; */

  animation: skeletonfadein 0.6s;

  & {
    @keyframes skeletonfadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const StyledMobileSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;
