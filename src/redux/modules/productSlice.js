import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {},
  extraReducers: {},
});
