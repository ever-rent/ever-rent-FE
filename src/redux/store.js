import { configureStore } from "@reduxjs/toolkit";
import { products } from "./modules/productSlice";

export const store = configureStore({
  reducer: { products },
});
