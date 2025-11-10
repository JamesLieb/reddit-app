import { configureStore } from "@reduxjs/toolkit";
import subredditsReducer from "./slices/subbredditsSlice";


export const store = configureStore({
  reducer: {
    subreddits: subredditsReducer
  },
});

