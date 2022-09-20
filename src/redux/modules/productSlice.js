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

export const addProducts = createAsyncThunk(
  "POST_PRODUCTS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/products`,
        payload
      );
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (errer) {
      return thunkAPI.rejectWithValue(errer);
    }
  }
);

export const updateProducts = createAsyncThunk(
  "UPDATAE_PRODUCTS",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const response = await axios.put(
        `http://localhost:3001/products/${payload}`,
        payload
      );
      console.log("response", response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "DELETE_PRODUCTS",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/products/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
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
    /* Pending */
    [getProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateProducts.pending]: (state, action) => {
      state.isLoading = true;
    },

    /* Fulfilled */
    [getProducts.fulfilled]: (state, action) => {
      // console.log("reducer", action);
      state.products = action.payload;
      // console.log(action);
    },
    [addProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products[0].data = state.products[0].data
        .concat(action.payload)
        .map((item) => item);
      return state;
    },
    [updateProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      const newState = state.products[0].data.map((item) =>
        action.meta.arg.id === item.id
          ? {
              ...item,
              title: action.payload.title,
              description: action.payload.description,
              category: action.payload.category,
              price: action.payload.price,
              startDate: action.payload.startDate,
              endDate: action.payload.endDate,
              images: action.payload.images,
            }
          : item
      );
      state.products[0].data = newState;
      return state;
    },
    [deleteProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      const newState = state.products[0].data.filter(
        (item) => item.id !== action.payload.id
      );
      state.products[0].data = newState;
      return state;
    },

    /* Rejected */
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const products = productSlice.reducer;
