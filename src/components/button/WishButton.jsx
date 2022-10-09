import { useState } from "react";
import { useMutation } from "react-query";
import { StyledImagesWrap, StyledLikeImage } from "../../pages/ProductDetail";
import { productAPI } from "../../server/api";

export const WishButton = ({ productId, data }) => {
  const [liked, setLiked] = useState(false);

  const { mutate } = useMutation(productAPI.toggleWishProduct, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.dir(error);
    },
  });

  console.log(data);
  console.log(data);

  if (liked === false) {
    return (
      <StyledImagesWrap
        onClick={() => {
          setLiked(!liked);
          mutate(productId);
        }}
      >
        <StyledLikeImage
          src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgkeHi%2FbtrMozXmz7i%2FE8hhKrvx2SGs80W8YEXFGk%2Fimg.png"
          alt="https://icons8.com/icon/87/heart Heart icon by https://icons8.com Icons8"
        />
        <span>찜하기</span>
      </StyledImagesWrap>
    );
  } else {
    return (
      <StyledImagesWrap
        onClick={() => {
          setLiked(!liked);
          mutate(productId);
        }}
      >
        <StyledLikeImage
          src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDoa5l%2FbtrMvM9d2ZW%2FoA2ssgiZFbkWmn9PZwGbS0%2Fimg.png"
          alt="https://icons8.com/icon/7697/heart Heart icon by https://icons8.com Icons8"
        />
        <span>찜하기</span>
      </StyledImagesWrap>
    );
  }
};
