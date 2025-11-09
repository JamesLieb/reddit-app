import { createSlice} from "@reduxjs/toolkit";
import { fetchRedditSearch } from "../thunks/searchThunks";

const subredditsSlice = createSlice({
  name: "subreddits",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    searchTerm: ''
  },
  reducers: {
    clearResults: (state) => {
      state.posts = [];
      state.error = null;
      state.searchTerm = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRedditSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRedditSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchRedditSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearResults } = subredditsSlice.actions;
export default subredditsSlice.reducer;
