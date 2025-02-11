import { getOrganization } from "@/features/organizations/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for fetching desks
export const fetchUserOrganizationThunk = createAsyncThunk(
  "desks/fetchOrganiztion",
  async ({ organizationId }) => {
    const organization = await getOrganization({ organizationId });
    return organization;
  }
);

const organizationSlice = createSlice({
  name: "organization",
  initialState: {
    organization: {},
    loading: true,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrganizationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrganizationThunk.fulfilled, (state, action) => {
        state.organization = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserOrganizationThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

// export const {} = desksSlice.actions;
export default organizationSlice.reducer;
