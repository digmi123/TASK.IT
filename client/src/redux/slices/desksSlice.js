import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDesks,
  addNewDesk as addNewDeskApi,
  deleteDesk as deleteDeskApi,
} from "@/features/desks/api"; // Replace with your API calls

// Async thunk for fetching desks
export const fetchDesksThunk = createAsyncThunk(
  "desks/fetchDesks",
  async () => {
    const desks = await getDesks();
    return desks;
  }
);

export const addNewDeskThunk = createAsyncThunk(
  "desks/addNewDesk",
  async ({ deskName, template }, { dispatch }) => {
    const newDesk = await addNewDeskApi({ deskName, template });
    dispatch(addDesk(newDesk));
  }
);

export const deleteDeskThunk = createAsyncThunk(
  "desks/deleteDesk",
  async ({ deskId }, { dispatch }) => {
    await deleteDeskApi({ deskId });
    dispatch(deleteDesk({ deskId }));
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
      state.desks = [...state.desks, action.payload];
    },
    deleteDesk: (state, action) => {
      state.desks = state.desks.filter(
        (desk) => desk.id !== action.payload.deskId
      );
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

    builder
      .addCase(addNewDeskThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewDeskThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNewDeskThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addDesk, deleteDesk } = desksSlice.actions;
export default desksSlice.reducer;
