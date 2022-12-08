import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import packageTypeServices from '../../services/packageType.service';

export const getAllPackageType = createAsyncThunk(
  'getAllPackageType',
  async (data, { dispatch, rejectWithValue }) => {
    let urlString = '';
    if (data) {
      let urlArr = [];
      for (let item in data) {
        if (data[item] !== undefined) {
          if (Array.isArray(data[item])) {
            data[item]?.map((element, idx) => {
              let newStr = `PackageTypeDetailSearch.${item}=${data[item][idx]}`;
              urlArr.push(newStr);
            });
          } else {
            let newStr = `PackageTypeDetailSearch.${item}=${data[item]}`;
            urlArr.push(newStr);
          }
        }
        urlString = '?' + urlArr.join('&');
      }
    }
    try {
      const response = await packageTypeServices.getPackageTypeList(urlString);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addNewPackageType = createAsyncThunk(
  'addNewPackageType',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await packageTypeServices.addPackageType(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const updatePackageType = createAsyncThunk(
  'updatePackageType',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await packageTypeServices.updatePackageType(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const deletePackageType = createAsyncThunk(
  'deletePackageType',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await packageTypeServices.deletePackageType(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  allPackageType: [],
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
};

export const packageTypeSlice = createSlice({
  name: 'packageTypeSlice',
  initialState,
  reducers: {
    clearClasses: (state, action) => {
      state.allClassList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPackageType.fulfilled, (state, action) => {
      state.allPackageType = action?.payload?.data?.items;
      state.tableProperty = action?.payload?.data?.pagedProperty;
    });
  },
});
export const clearClasses = packageTypeSlice.actions;
