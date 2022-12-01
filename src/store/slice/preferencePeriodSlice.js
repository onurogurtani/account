import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import preferencePeriod from '../../services/preferencePeriod.services';
export const getEducationYearList = createAsyncThunk(
  'getEducationYearList',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await preferencePeriod.getEducationYearList({ PageNumber: 0, PageSize: 10 });
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.data);
    }
  },
);
export const getEducationYearAdd = createAsyncThunk(
  'getEducationYearList',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await preferencePeriod.getEducationYearAdd(data);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.data);
    }
  },
);
export const getEducationYearUpdate = createAsyncThunk(
  'getEducationYearList',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await preferencePeriod.getEducationYearAdd(data);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.data);
    }
  },
);
const initialState = {
  educationYearList: [],
};

export const preferencePeriodSlice = createSlice({
  name: 'preferencePeriodSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEducationYearList.fulfilled, (state, action) => {
      state.educationYearList = action.data;
    });
  },
});
export const clearClasses = preferencePeriodSlice.actions;
