import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import graduationYearsServices from '../../services/graduationYears.services';

export const getGraduationYears = createAsyncThunk(
  'getGraduationYears',
  async (body, { dispatch, rejectWithValue }) => {
    try {
      return await graduationYearsServices.getGraduationYears();
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  graduationYears: [],
};

export const graduationYearsSlice = createSlice({
  name: 'graduationYearsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGraduationYears.fulfilled, (state, action) => {
      state.graduationYears = action?.payload?.data?.items;
    });
    builder.addCase(getGraduationYears.rejected, (state) => {
      state.graduationYears = [];
    });
  },
});
