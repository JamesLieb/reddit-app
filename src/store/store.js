import { configureStore } from "@reduxjs/toolkit";
import subredditsReducer from "./slices/subbredditsSlice";
import popularDisplayReducer from "./slices/PopularSlice";

export const store = configureStore({
  reducer: {
    subreddits: subredditsReducer,
    Popular: popularDisplayReducer,
  },
});

