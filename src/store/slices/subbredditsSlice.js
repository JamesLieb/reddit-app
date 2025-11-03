import { createSlice} from "@reduxjs/toolkit";

const subredditsSlice = createSlice({
  name: "subreddits",
  initialState: [],
  reducers: {
    setSubreddits: (state, action) => {
      state = action.payload;
      return state;
    },
    getSubreddits: (state) => {
      return state;
    },
  },
});

export const { setSubreddits, getSubreddits } = subredditsSlice.actions;
export default subredditsSlice.reducer;
