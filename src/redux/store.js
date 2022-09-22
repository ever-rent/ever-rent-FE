import { configureStore } from "@reduxjs/toolkit";
import { products } from "./modules/productSlice";
import { nav } from "./modules/navSlice";

export const store = configureStore({
  reducer: { products, nav },
});
