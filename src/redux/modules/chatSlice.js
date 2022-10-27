import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatAPI, productAPI } from "../../server/api";

export const getMyChatRoom = createAsyncThunk(
  "getMyChatRoom",
  async (_, thunkAPI) => {
    try {
      const response = await chatAPI.getChatRoomList();
      return thunkAPI.fulfillWithValue(response.data.chatRoomResponseDtoList);
    } catch (error) {
      console.log(error);
    }
  }
);

export const createChatRoom = createAsyncThunk(
  "createChatRoom",
  async (payload, thunkAPI) => {
    try {
      const { data } = await chatAPI.createChatRoom(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductDetail = createAsyncThunk(
  "getProductDetail",
  async (payload, thunkAPI) => {
    try {
      const { data } = await productAPI.getProductDetail(payload);      
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
    }
  }
);

const chatListSlice = createSlice({
  name: "chatList",
  initialState: {
    chatRoomList: [],
    productDetail: {},
  },
  extraReducers: {
    [getMyChatRoom.fulfilled]: (state, action) => {
      state.chatRoomList = action.payload;
    },
    [getProductDetail.fulfilled]: (state, action) => {
      state.productDetail = action.payload;
    },
  },
});

export const chat = chatListSlice.reducer;
