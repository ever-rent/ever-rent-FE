import React from 'react'
import { BorrowCommonItem } from './BorrowCommonItem';

export  const BorrowCommonList = (props) => {
    const list = props.props;
    const index = props.index;

  // console.log("props>>", props);
  // console.log("props.props>>", props.props);
  // console.log("index", index);
return (
    <div>
    {list?.map((item) => {
        return <BorrowCommonItem item={item} key={item.id} index={index} />;
    })}
    </div>
)
}
