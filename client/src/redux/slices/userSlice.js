import { getUserInfo } from "@/features/users/api";
import { handleLogout } from "@/shared/auth/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for fetching desks
export const fetchUserInfoThunk = createAsyncThunk(
  "desks/fetchUser",
  async () => {
    const user = await getUserInfo();
    return user;
  }
);

// export const logoutThunk = createAsyncThunk("user/logout", async () => {
//   console.log("on Thunk");
//   // Check if it is neccessary to put it here and clear the user state.
//   await handleLogout();
// });

const userSlice = createSlice({
  name: "desks",
  initialState: {
    user: {},
    loading: true,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfoThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserInfoThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserInfoThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

// export const {} = desksSlice.actions;
export default userSlice.reducer;
