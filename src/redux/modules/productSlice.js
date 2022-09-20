import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productAPI } from "../../server/api";
import { current } from "@reduxjs/toolkit";

//Main page 상품 GET
export const getProducts = createAsyncThunk(
  "GET_PRODUCTS",
  async (_, thunkAPI) => {
    console.log("products get 시작");
    try {
      // const res = await instance.get("api/products");
      const res = await productAPI.getProducts();

      console.log("producs get 성공", res.data);
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
    console.log("products get 시작", payload);
    try {
      // const res = await instance.get("api/products");
      const res = await productAPI.getProductDetail(payload.id);

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
      console.log(payload);
      const { data } = await productAPI.updateProduct(
        payload[0],
        payload[1].productId
      );
      console.log("response", data.data);
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
      await productAPI.deleteProduct(payload.id);
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
      state.products = action.payload.data;
    },

    [getProductsDetail.fulfilled]: (state, action) => {
      console.log("reducer", action);
      state.products = action.payload.data;
      // console.log(action);
    },
    [addProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(current(state));
      console.log(action);
      state.products = state.products.concat(action.payload);
      return state;
    },
    [updateProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(current(state));
      console.log(action);
      const newState = state.products.map((item) =>
        action.payload.id === item.id
          ? {
              ...item,
              productName: action.payload.productName,
              content: action.payload.content,
              cateId: action.payload.cateId,
              price: action.payload.price,
              rentStart: action.payload.rentStart,
              rentEnd: action.payload.rentEnd,
              imgUrl: action.payload.imgUrl,
            }
          : item
      );
      state.products = newState;
      return state;
    },
    [deleteProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(current(state))
      console.log(current(state.products[0]))
      console.log(action)
      const newState = state.products.filter(
        (item) => item.id !== Number(action.payload.id)
      );
      state.products = newState;
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
