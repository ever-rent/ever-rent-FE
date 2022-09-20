import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Main page 상품 GET
export const getProducts = createAsyncThunk(
  "GET_PRODUCTS",
  async (_, thunkAPI) => {
    // console.log("products get 시작");
    try {
      // const res = await instance.get('/products');
      const res = await axios.get("http://localhost:3001/products");
      // console.log("producs get 성공", res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Category page 상품 GET
export const getCategoryDetail = createAsyncThunk(
  "GET_CATEGORY_DETAIL",
  async (categoryId, thunkAPI) => {
    // console.log("getCategoryDetail 시작");
    try {
      // const res = await instance.get(`/categories/${categoryId}`);
      const res = await axios.get("http://localhost:3001/category");
      // console.log("getCategoryDetail 성공>>", res.data);
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
    category: [],
  },
  reducers: {},
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      // console.log("reducer", action);
      state.products = action.payload;
    },
    [getCategoryDetail.fulfilled]: (state, action) => {
      // console.log("getCategoryDetail>>", action);
      state.category = action.payload;
    },
  },
});

export const products = productSlice.reducer;
