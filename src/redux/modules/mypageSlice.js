import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productAPI } from "../../server/api";

//TODO: Mypage 상품 GET(아직 api 명세서 없음. 4개의 api작성 예정.)
// 빌려준 물건

//목록 get
export const myPageList = createAsyncThunk(
  "MYPAGE_LIST",
  async (payload, thunkAPI) => {
    // console.log("products get 시작");
    try {
      const res = await productAPI.getProducts(payload);

      // console.log("producs get 성공", res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//대기중 get
export const myPagePending = createAsyncThunk(
  "MYPAGE_PENDING",
  async (payload, thunkAPI) => {
    // console.log("products get 시작");
    try {
      const res = await productAPI.getProducts(payload);

      // console.log("producs get 성공", res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//렌탈확정 get
export const myPageConfirm = createAsyncThunk(
  "MYPAGE_CONFIRM",
  async (payload, thunkAPI) => {
    // console.log("products get 시작");
    try {
      const res = await productAPI.getProducts(payload);

      // console.log("producs get 성공", res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//기한 마감 get
export const myPageOverDeadline = createAsyncThunk(
  "MYPAGE_OVER_DEADLINE",
  async (payload, thunkAPI) => {
    // console.log("products get 시작");
    try {
      const res = await productAPI.getProducts(payload);

      // console.log("producs get 성공", res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const mypageSlice = createSlice({
  name: "mypage",
  initialState: {
    list: [],
    pending: [],
    confirm: [],
    deadline: [],
  },
  reducers: {},
  extraReducers: {
    /* Pending */
    [myPageList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [myPagePending.pending]: (state, action) => {
      state.isLoading = true;
    },
    [myPageConfirm.pending]: (state, action) => {
      state.isLoading = true;
    },
    [myPageOverDeadline.pending]: (state, action) => {
      state.isLoading = true;
    },

    /* Fulfilled */
    [myPageList.fulfilled]: (state, action) => {
      state.products = action.payload.data;
    },
    [myPagePending.fulfilled]: (state, action) => {
      state.products = action.payload.data;
    },
    [myPageConfirm.fulfilled]: (state, action) => {
      state.products = action.payload.data;
    },
    [myPageOverDeadline.fulfilled]: (state, action) => {
      state.products = action.payload.data;
    },

    /* Rejected */
    [myPageList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [myPagePending.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [myPageConfirm.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [myPageOverDeadline.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const mypage = mypageSlice.reducer;
