import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import educationYearsServices from '../../services/EducationYears.services';
export const getEducationYearList = createAsyncThunk(
  'getEducationYearList',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await educationYearsServices.getEducationYearList(null, data?.params);
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
      const response = await educationYearsServices.getEducationYearAdd(data);
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
      const response = await educationYearsServices.getEducationYearUpdate(data);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.data);
    }
  },
);
export const getEducationYearDelete = createAsyncThunk(
  'getEducationYearList',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await educationYearsServices.getEducationYearDelete(data);
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

export const educationYearsSlice = createSlice({
  name: 'educationYearsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEducationYearList.fulfilled, (state, action) => {
      state.educationYearList = action.payload.data;
    });
  },
});
export const clearClasses = educationYearsSlice.actions;
