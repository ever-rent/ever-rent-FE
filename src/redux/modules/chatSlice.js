import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { chatAPI } from "../../server/api";

export const createChatRoom = createAsyncThunk(
  "CREATE_CHAT_ROOM",
  async (payload, thunkAPI) => {
    try {
      const response = await chatAPI.createChatRoom(payload);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }
);

const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {},
});

export const { postChat, clearChat } = chatSlice.actions;
export const chat = chatSlice.reducer;
