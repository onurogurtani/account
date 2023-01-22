import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import trialTypeServices from '../../services/trialType.service';

export const getTrialTypeList = createAsyncThunk(
  'getTrialTypeList',
  async ({ data } = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await trialTypeServices.getTrialType(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const getTrialTypeAdd = createAsyncThunk('getTrialTypeAdd', async (data = {}, { dispatch, rejectWithValue }) => {
  try {
    const response = await trialTypeServices.getTrialTypeAdd(data);
    return response;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error?.data);
  }
});
export const getTrialTypeUpdate = createAsyncThunk(
  'getTrialTypeUpdate',
  async (data = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await trialTypeServices.getTrialTypeUpdate(data);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  trialTypeList: [],
};

export const trialTypeSlice = createSlice({
  name: 'trialTypeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTrialTypeList.fulfilled, (state, action) => {
      state.trialTypeList = action?.payload?.data;
    });
  },
});
