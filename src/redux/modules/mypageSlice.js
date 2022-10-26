import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mypageAPI } from "../../server/api";
import { current } from "@reduxjs/toolkit";

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
    console.log(orderId);
    try {
      const res = await mypageAPI.acceptOrder(orderId);
      console.log("response", res.data);
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

// 빌린 물건

// 물건 목록 get
export const getBorrowList = createAsyncThunk(
  "GET_BORROW_LIST",
  async (_, thunkAPI) => {
    // console.log("getBorrowList 시작");
    try {
      const { data } = await mypageAPI.getBorrowList();
      // console.log("getBorrowList 성공", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 물건 목록 get
export const getPastList = createAsyncThunk(
  "GET_PAST_LIST",
  async (_, thunkAPI) => {
    // console.log("getPastList 시작");
    try {
      const { data } = await mypageAPI.getPastList();
      // console.log("getPastList 성공", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//TODO: 테스트용 렌트 신청!!
export const postRent = createAsyncThunk(
  "POST_RENT",
  async (payload, thunkAPI) => {
    console.log("postRent 시작>>", typeof productId);
    try {
      const { data } = await mypageAPI.postRent(
        {
          buyStart: payload.buyStart,
          buyEnd: payload.buyEnd,
        },
        payload.productId
      );
      console.log("postRent 성공>>", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (errer) {
      return thunkAPI.rejectWithValue(errer);
    }
  }
);

export const postLike = createAsyncThunk(
  "POST_LIKE",
  async (payload, thunkAPI) => {
    console.log("postLike 시작");
    try {
      const { data } = await mypageAPI.postLike(payload);
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (errer) {
      return thunkAPI.rejectWithValue(errer);
    }
  }
);

export const getMyInfo = createAsyncThunk(
  "GET_MY_INFO",
  async (_, thunkAPI) => {
    console.log("getMyInfo 시작");
    try {
      const { data } = await mypageAPI.getMyInfo();
      console.log("getMyInfo 성공", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const putMyProfileImage = createAsyncThunk(
  "PUT_MY_PROFILE",
  async (payload, thunkAPI) => {
    console.log("putMyProfileImage 시작");
    try {
      const { data } = await mypageAPI.putMyProfileImg(payload);
      console.log("getMyInfo 성공", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getWishList = createAsyncThunk(
  "GET_LIKE_LIST",
  async (_, thunkAPI) => {
    console.log("getWishList 시작");
    try {
      const { data } = await mypageAPI.getWishList();
      console.log("getWishList 성공", data.data);
      return thunkAPI.fulfillWithValue(data.data);
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
    borrow: [],
    past: [],
    reservation: [],
    myinfo: [],
    like: [],
    MyWish: [],
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

    //빌려준 물건
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

    //TODO: 빌린 물건.
    [getBorrowList.fulfilled]: (state, action) => {
      state.borrow = action.payload;
    },
    [getPastList.fulfilled]: (state, action) => {
      state.past = action.payload;
    },

    //TODO: 테스트용 렌트 신청!!
    [postRent.fulfilled]: (state, action) => {
      // console.log("action", action);
      // console.log("state", current(state));
      state.reservation.push(action.payload);
      // state.reservation = state.reservation.concat(action.payload);
    },
    [postLike.fulfilled]: (state, action) => {
      console.log("action", action);
      // console.log("state", state);
      state.like = action.payload;
    },
    [getMyInfo.fulfilled]: (state, action) => {
      state.myinfo = action.payload;
    },
    [putMyProfileImage.fulfilled]: (state, action) => {
      console.log(current(state));
      console.log(action.payload);
      state.myinfo.imgUrl = action.payload.imgUrl;
    },
    [getWishList.fulfilled]: (state, action) => {
      state.MyWish = action.payload;
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
