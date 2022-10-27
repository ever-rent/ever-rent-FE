import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatAPI } from "../../server/api";

const initialState = {
  chatRoomList: [],
};

export const getMyChatRoom = createAsyncThunk(
  "getMyChatRoom",
  async (_, thunkAPI) => {
    try {
      const response = await chatAPI.getChatRoomList();
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
      const { data } = await chatAPI.createChatRoom(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
    }
  }
);

const chatListSlice = createSlice({
  name: "chatList",
  initialState,
  extraReducers: {
    [getMyChatRoom.fulfilled]: (state, action) => {
      state.chatRoomList = action.payload;
    },
  },
});

export const chat = chatListSlice.reducer;
