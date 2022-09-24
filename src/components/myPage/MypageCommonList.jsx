import React from "react";
import { MypageCommonItem } from "./MypageCommonItem";

export const MypageCommonList = (props) => {
  const list = props;

  return (
    <div>
      {list?.map((item) => {
        return <MypageCommonItem {...item} key={item.id} />;
      })}
    </div>
  );
};
