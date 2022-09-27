import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
  name: "nav",
  initialState: {
    openState: false,
  },
  reducers: {
    openNav: (state, action) => {
      state.openState = !state.openState;
    },
  },
});

export const { openNav } = navSlice.actions;
export const nav = navSlice.reducer;
