import React from "react";
import { RentalCommonItem } from "./RentalCommonItem";

export const RentalCommonList = (props) => {
  const list = props.props;
  const index = props.index;
  // const button = props.button;
  // const url = props.url;

  // console.log("props>>", props);
  // console.log("props.props>>", props.props);
  // console.log("button", button);
  // console.log("url", url);
  console.log("index", index);
  return (
    <div>
      {list?.map((item) => {
        return <RentalCommonItem item={item} key={item.id} index={index} />;
      })}
    </div>
  );
};
