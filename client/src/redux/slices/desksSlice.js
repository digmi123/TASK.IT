import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDesks } from "@/features/desks/api"; // Replace with your API calls

// Async thunk for fetching desks
export const fetchDesksThunk = createAsyncThunk(
  "desks/fetchDesks",
  async () => {
    const desks = await getDesks();
    return desks; // Adjust based on your API
  }
);

// Slice definition
const desksSlice = createSlice({
  name: "desks",
  initialState: {
    desks: [],
    loading: true,
  },
  reducers: {
    addDesk: (state, action) => {
      state.desks.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDesksThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDesksThunk.fulfilled, (state, action) => {
        state.desks = action.payload;
        state.loading = false;
      })
      .addCase(fetchDesksThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addDesk } = desksSlice.actions;
export default desksSlice.reducer;
