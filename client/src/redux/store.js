import { configureStore } from "@reduxjs/toolkit";
import desksReducer from "./slices/desksSlice";
import boardReducer from "./slices/boardSlice";

export const store = configureStore({
  reducer: {
    desks: desksReducer,
    board: boardReducer,
  },
});
