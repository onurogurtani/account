import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import packageServices from '../../services/package.services';

export const getPackageList = createAsyncThunk(
  'getPackageList',
  async (body, { dispatch, rejectWithValue }) => {
    try {
      return await packageServices.getPackageList();
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addPackage = createAsyncThunk(
  'addPackage',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await packageServices.addPackage(data);
      await dispatch(getPackageList());
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const updatePackage = createAsyncThunk(
  'updatePackage',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await packageServices.updatePackage(data);
      await dispatch(getPackageList());
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  packages: [],
};

export const packageSlice = createSlice({
  name: 'packageSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPackageList.fulfilled, (state, action) => {
      state.packages = action?.payload?.data?.items;
    });
    builder.addCase(getPackageList.rejected, (state) => {
      state.packages = [];
    });
  },
});
