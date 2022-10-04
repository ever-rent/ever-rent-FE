import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mypageAPI } from "../../server/api";

// 빌려준 물건

// Mypage 목록 get
export const getMyPageList = createAsyncThunk(
  "GET_MYPAGE_LIST",
  async (_, thunkAPI) => {
    // console.log("getMyPageList 시작");
    try {
      const { data } = await mypageAPI.getMyPageList();
      // console.log("getMyPageList 성공", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Mypage 대기중 get
export const getMyPagePending = createAsyncThunk(
  "GET_MYPAGE_PENDING",
  async (_, thunkAPI) => {
    // console.log("getMyPagePending 시작");
    try {
      const res = await mypageAPI.getMyPagePending();
      // console.log("getMyPagePending 성공", res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Mypage 대기중 list에서 수락 put
export const acceptOrder = createAsyncThunk(
  "ACCEPT_ORDER",
  async (orderId, thunkAPI) => {
    // console.log(orderId);
    try {
      const res = await mypageAPI.acceptOrder(orderId);
      // console.log("response", res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Mypage 렌탈확정 get
export const getMyPageConfirm = createAsyncThunk(
  "GET_MYPAGE_CONFIRM",
  async (_, thunkAPI) => {
    // console.log("getMyPageConfirm 시작");
    try {
      const res = await mypageAPI.getMyPageConfirm();
      // console.log("getMyPageConfirm 성공", res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Mypage 기한 마감 get
export const getMyPageExpired = createAsyncThunk(
  "MYPAGE_OVER_DEADLINE",
  async (_, thunkAPI) => {
    // console.log("products get 시작");
    try {
      const res = await mypageAPI.getMyPageExpired();
      // console.log("getMyPageExpired 성공", res.data);
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
    // /* Pending */
    // [getMyPageList.pending]: (state, action) => {
    //   state.isLoading = true;
    // },
    // [getMyPagePending.pending]: (state, action) => {
    //   state.isLoading = true;
    // },
    // [acceptOrder.pending]: (state, action) => {
    //   state.isLoading = true;
    // },
    // [getMyPageConfirm.pending]: (state, action) => {
    //   state.isLoading = true;
    // },
    // [getMyPageExpired.pending]: (state, action) => {
    //   state.isLoading = true;
    // },

    /* Fulfilled */
    [getMyPageList.fulfilled]: (state, action) => {
      // console.log(action);
      state.list = action.payload;
    },
    [getMyPagePending.fulfilled]: (state, action) => {
      // state.pending = action.payload; //임시
      state.pending = action.payload.data;
    },
    //수락하면 렌탈확정에 넣어줘야함.
    [acceptOrder.fulfilled]: (state, action) => {
      state.confirm = state.pending.map((item) =>
        action.payload.id === item.id ? { ...action.payload } : item
      );
    },

    [getMyPageConfirm.fulfilled]: (state, action) => {
      state.confirm = action.payload.data;
    },
    [getMyPageExpired.fulfilled]: (state, action) => {
      state.deadline = action.payload.data;
    },

    // /* Rejected */
    // [getMyPageList.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    // [getMyPagePending.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    // [getMyPageConfirm.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    // [getMyPageExpired.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

export const mypage = mypageSlice.reducer;
