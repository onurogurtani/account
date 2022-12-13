import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userTypeServices from '../../services/userType.service';

export const getUserTypesList = createAsyncThunk('getUserTypesList', async (body, { dispatch, rejectWithValue }) => {
  try {
    const response = await userTypeServices.getUserTypesList();
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

const initialState = {
  userTypes: [],
};

export const userTypeSlice = createSlice({
  name: 'userTypes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserTypesList.fulfilled, (state, action) => {
      state.userTypes = action?.payload?.data;
    });
    builder.addCase(getUserTypesList.rejected, (state) => {
      state.userTypes = [];
    });
  },
});
