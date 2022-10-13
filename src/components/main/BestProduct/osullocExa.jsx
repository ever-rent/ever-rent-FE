import styles from "./BestProducts.module.css";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBestProducts } from "../../../redux/modules/productSlice";
import ProductItem from "../../productItem/ProductItem";
import { useNavigate } from "react-router-dom";

const BestProducts = () => {
  const bestProducts = useSelector((store) => store.product.bestProducts);

  const productsRef = useRef();
  const productsBox = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBestProducts());
  }, []);

  const allProducts = () => {
    navigate("/products");
  };

  function makeArr(bestProducts) {
    let arr = [];
    bestProducts.map((_, idx) => arr.push(idx));
    return arr;
  }

  const idxArr = makeArr(bestProducts);
  let idx = 0;

  const back = () => {
    const forwardIdx = idxArr[--idx];
    if (forwardIdx === undefined) {
      idx = 0;
      return;
    }
    move(forwardIdx);
  };

  const forward = () => {
    // 한페이지에 보이는 아이템 수: 5
    if (idx > 4) {
      return;
    } else {
      let backIdx = idxArr[++idx];
      move(backIdx);
    }
  };

  const move = (idx) => {
    productsRef.current.style.transform = `translateX(${-idx * 15}em)`;
  };

  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <button className={styles.btnBackProduct} onClick={back}>
          &lt;
        </button>
        <div className={styles.productsContainer}>
          <p className={styles.title}>오늘은 어떤 차를 마셔볼까요?</p>
          <div className={styles.productsBox}>
            <div>
              <div className={styles.products} ref={productsRef}>
                {bestProducts.map((product) => {
                  return (
                    <ProductItem product={product} key={product.productId} />
                  );
                })}
              </div>
            </div>
          </div>
          <button className={styles.btnAllProducts} onClick={allProducts}>
            더 보기 &gt;
          </button>
        </div>
        <button className={styles.btnForwardProduct} onClick={forward}>
          &gt;
        </button>
      </div>
    </section>
  );
};

export default BestProducts;
