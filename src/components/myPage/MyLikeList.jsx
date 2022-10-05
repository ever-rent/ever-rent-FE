import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikeList } from "../../redux/modules/mypageSlice";
import { MyLikeItem } from "./MyLikeItem";
export const MyLikeList = () => {
  const dispatch = useDispatch();
  const likeList = useSelector((state) => state.mypage.myLike);
  console.log("MyLikeList >> likeList", likeList);

  useEffect(() => {
    dispatch(getLikeList());
  }, [dispatch]);

  return (
    <div>
      <div>
        {likeList?.map((item) => {
          return <MyLikeItem item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};
