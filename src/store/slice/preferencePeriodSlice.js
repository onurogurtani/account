import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import preferencePeriodServices from '../../services/preferencePeriod.services';

export const getPreferencePeriod = createAsyncThunk(
  'getPreferencePeriod',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      return await preferencePeriodServices.preferencePeriodGetList(data);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const getPreferencePeriodAdd = createAsyncThunk(
  'getPreferencePeriodAdd',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      return await preferencePeriodServices.preferencePeriodAdd(data);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const getPreferencePeriodUpdate = createAsyncThunk(
  'getPreferencePeriodUpdate',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      return await preferencePeriodServices.preferencePeriodUpdate(data);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const getEducationYears = createAsyncThunk(
  'getEducationYears',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      return await preferencePeriodServices.getEducationYears();
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
const initialState = {
  preferencePeriod: [],
  educationYears: [],
};

export const preferencePeriodSlice = createSlice({
  name: 'preferencePeriodSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPreferencePeriod.fulfilled, (state, action) => {
      state.preferencePeriod = action.payload.data;
    });
    builder.addCase(getEducationYears.fulfilled, (state, action) => {
      state.educationYears = action.payload.data;
    });
  },
});
