import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productAPI } from "../../server/api";
import { auth } from "../../server/core/instance";

export const getMyChatRoom = createAsyncThunk(
  "getMyChatRoom",
  async (payload, thunkAPI) => {
    try {
      const response = await auth.get("/chat/rooms");
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data.chatRoomResponseDtoList);
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const createChatRoom = createAsyncThunk(
  "createChatRoom",
  async (payload, thunkAPI) => {
    try {
      const response = await auth.post(`/create/chat/${payload}`);
      console.log(payload);
      console.log(response);
      //  return console.log(response)
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }
);

export const getProductsDetail = createAsyncThunk(
  "GET_PRODUCTS",
  async (payload, thunkAPI) => {
    console.log("products get 시작", payload);
    try {
      const res = await productAPI.getProductDetail(payload);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    chatList: [],
    chatRoomList: [],
    chatRoomDetail: {},
  },
  extraReducers: {
    [getMyChatRoom.fulfilled]: (state, action) => {
      state.chatRoomList = action.payload;
    },
    [getProductsDetail.fulfilled]: (state, action) => {
      state.chatRoomDetail = action.payload;
    },
  },
});

export const { postChat, clearChat } = chatSlice.actions;
export const chat = chatSlice.reducer;
