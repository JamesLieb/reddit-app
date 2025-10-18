import { createSlice } from "@reduxjs/toolkit";

const popularDisplaySlice = createSlice({
  name: "popularDisplay",
  initialState: {
    currentPopular: [],
  },
  reducers: {
    setPopular(state, action) {
      state.currentPopular = action.payload;
    },
  },
});

export const { setPopular } = popularDisplaySlice.actions;
export default popularDisplaySlice.reducer;

