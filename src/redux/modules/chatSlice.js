import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productAPI } from "../../server/api";
import { auth } from "../../server/core/instance";

export const getMyChatRoom = createAsyncThunk(
  "GET_CHAT_LIST",
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
  "CREATE_CHAT_ROOM",
  async (payload, thunkAPI) => {
    try {
      const response = await auth.post(`/create/chat/${payload}`);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }
);

export const getProductsDetail = createAsyncThunk(
  "GET_PRODUCT",
  async (payload, thunkAPI) => {
    try {
      const { data } = await productAPI.getProductDetail(payload);
      return thunkAPI.fulfillWithValue(data.data);
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
      console.log(action.payload);
      state.chatRoomDetail = action.payload;
    },
  },
});

export const { postChat, clearChat } = chatSlice.actions;
export const chat = chatSlice.reducer;
