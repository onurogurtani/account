import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import branchsServices from '../../services/branchs.services';

export const getBranchs = createAsyncThunk(
  'getBranchs',
  async (data, { dispatch, rejectWithValue }) => {
    let urlString = '';
    if (data) {
      let urlArr = [];
      for (let item in data) {
        if (data[item] !== undefined) {
          if (Array.isArray(data[item])) {
            data[item]?.map((element, idx) => {
              let newStr = `BranchDetailSearch.${item}=${data[item][idx]}`;
              urlArr.push(newStr);
            });
          } else {
            let newStr = `BranchDetailSearch.${item}=${data[item]}`;
            urlArr.push(newStr);
          }
        }
        urlString = '?' + urlArr.join('&');
      }
    }
    try {
      const response = await branchsServices.getBranchs(urlString);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addBranchs = createAsyncThunk(
  'addBranchs',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await branchsServices.addBranchs(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const updateBranchs = createAsyncThunk(
  'updateBranchs',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await branchsServices.updateBranchs(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const deleteBranchs = createAsyncThunk(
  'deleteBranchs',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await branchsServices.deleteBranchs(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  allBranchs: [],
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
};

export const branchsSlice = createSlice({
  name: 'branchsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBranchs.fulfilled, (state, action) => {
      state.allBranchs = action?.payload?.data?.items;
      state.tableProperty = action?.payload?.data?.pagedProperty;
    });
  },
});
