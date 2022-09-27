import { configureStore } from "@reduxjs/toolkit";
import { products } from "./modules/productSlice";
import { nav } from "./modules/navSlice";
import { mypage } from "./modules/mypageSlice";

export const store = configureStore({
  reducer: { products, nav, mypage },
});
