import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productAPI } from "../../server/api";

//Main page 상품 GET
export const getProducts = createAsyncThunk(
  "GET_PRODUCTS",
  async (_, thunkAPI) => {
    // console.log("products get 시작");
    try {
      // const res = await instance.get("api/products");
      const res = await productAPI.getProducts();
      // console.log("producs get 성공", res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Category 상품 GET
export const getCategory = createAsyncThunk(
  "GET_CATEGORY_DETAIL",
  async (payload, thunkAPI) => {
    // console.log("getCategory get 시작");
    try {
      // const res = await instance.get("api/products");
      const res = await productAPI.getCategory(payload);
      // console.log("getCategory get 성공", res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductsDetail = createAsyncThunk(
  "GET_PRODUCTS",
  async (payload, thunkAPI) => {
    // console.log("products get 시작");
    try {
      // const res = await instance.get("api/products");
      const res = await productAPI.getProductDetail(payload);
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
      const { data } = await productAPI.addProduct(payload);
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
      const response = await productAPI.updateProduct(payload);
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
      await productAPI.deleteProduct(payload);
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
    category: [],
  },
  reducers: {},
  extraReducers: {
    /* Pending */
    [getProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getProductsDetail.pending]: (state, action) => {
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
    },

    [getProductsDetail.fulfilled]: (state, action) => {
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

    [getCategory.fulfilled]: (state, action) => {
      // console.log("getCategoryDetail>>", action);
      state.category = action.payload;
    },

    /* Rejected */
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getProductsDetail.rejected]: (state, action) => {
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
