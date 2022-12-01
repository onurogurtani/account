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

const initialState = {
  preferencePeriod: [],
};

export const preferencePeriodSlice = createSlice({
  name: 'preferencePeriodSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPreferencePeriod.fulfilled, (state, action) => {
      state.preferencePeriod = action.payload.data;
    });
  },
});
