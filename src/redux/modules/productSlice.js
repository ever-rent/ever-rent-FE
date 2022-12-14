import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { productAPI } from "../../server/api";

//Main page 상품 GET
export const getProducts = createAsyncThunk(
  "GET_PRODUCTS",
  async (_, thunkAPI) => {
    try {
      const res = await productAPI.getProducts();
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
    try {
      const res = await productAPI.getCategory(payload);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductsDetail = createAsyncThunk(
  "GET_PRODUCTS",
  async (payload, thunkAPI) => {
    try {
      const res = await productAPI.getProductDetail(payload);
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
      return thunkAPI.fulfillWithValue(data.data);
    } catch (errer) {
      return thunkAPI.rejectWithValue(errer);
    }
  }
);

export const updateProducts = createAsyncThunk(
  "UPDATAE_PRODUCTS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await productAPI.updateProduct(
        payload[0],
        payload[1].productId
      );
      return thunkAPI.fulfillWithValue(data.data);
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
    recent: [],
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
      state.products = action.payload.data;
    },

    [getProductsDetail.fulfilled]: (state, action) => {
      state.products = action.payload.data;
      const data = state.recent.concat(action.payload.data);
      const uniqueData = [...new Set(data.map(JSON.stringify))].map(JSON.parse);
      state.recent = uniqueData;
    },
    [addProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = state.products.concat(action.payload);
      return state;
    },
    [updateProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      const newState = state.products.map((item) =>
        action.payload.id === item.id
          ? {
              ...item,
              productName: action.payload.productName,
              content: action.payload.content,
              cateId: action.payload.cateId,
              price: action.payload.price,
              location: action.payload.location,
              mapLocation: action.payload.mapLocation,
              rentStart: action.payload.rentStart,
              rentEnd: action.payload.rentEnd,
              imgUrlArray: action.payload.imgUrl,
            }
          : item
      );
      state.products = newState;
      return state;
    },
    [deleteProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      const newState = state.products.filter(
        (item) => item.id !== Number(action.payload.id)
      );
      state.products = newState;
      return state;
    },

    [getCategory.fulfilled]: (state, action) => {
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
