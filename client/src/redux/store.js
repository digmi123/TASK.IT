import { configureStore } from "@reduxjs/toolkit";
import desksReducer from "./slices/desksSlice";
import boardReducer from "./slices/boardSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    desks: desksReducer,
    board: boardReducer,
    user: userReducer,
  },
});
