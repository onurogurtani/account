import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import targetScreenServices from '../../services/targetScreen.services';

export const getAllTargetScreen = createAsyncThunk(
  'getAllTargetScreen',
  async (data, { dispatch, rejectWithValue }) => {
    let urlString = '';
    if (data) {
      let urlArr = [];
      for (let item in data) {
        if (data[item] !== undefined) {
          if (Array.isArray(data[item])) {
            data[item]?.map((element, idx) => {
              let newStr = `TargetScreenDetailSearch.${item}=${data[item][idx]}`;
              urlArr.push(newStr);
            });
          } else {
            let newStr = `TargetScreenDetailSearch.${item}=${data[item]}`;
            urlArr.push(newStr);
          }
        }
        urlString = '?' + urlArr.join('&');
      }
    }
    try {
      const response = await targetScreenServices.getTargetScreenList(urlString);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addNewTargetScreen = createAsyncThunk(
  'addNewTargetScreen',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await targetScreenServices.addTargetScreen(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const updateTargetScreen = createAsyncThunk(
  'updateTargetScreen',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await targetScreenServices.updateTargetScreen(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const deleteTargetScreen = createAsyncThunk(
  'deleteTargetScreen',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await targetScreenServices.deleteTargetScreen(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  allTargetScreen: [],
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
};

export const targetScreenSlice = createSlice({
  name: 'targetScreenSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTargetScreen.fulfilled, (state, action) => {
      state.allTargetScreen = action?.payload?.data?.items;
      state.tableProperty = action?.payload?.data?.pagedProperty;
    });
  },
});
