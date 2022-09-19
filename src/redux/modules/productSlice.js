import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "GET_PRODUCTS",
  async (_, thunkAPI) => {
    // console.log("products get 시작");
    try {
      // const res = await instance.get("api/products");
      const res = await axios.get("http://localhost:3001/products");
      // console.log("producs get 성공", res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {},
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      // console.log("reducer", action);
      state.products = action.payload;
      // console.log(action);
    },
  },
});

export const products = productSlice.reducer;
