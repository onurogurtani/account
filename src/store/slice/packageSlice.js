import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import packageServices from '../../services/package.services';

export const getPackageList = createAsyncThunk('getPackageList', async (data, { dispatch, rejectWithValue }) => {
  let urlString = '';
  if (data) {
    let urlArr = [];
    for (let item in data) {
      if (data[item] !== undefined) {
        if (Array.isArray(data[item])) {
          data[item]?.map((element, idx) => {
            let newStr = `PackageDetailSearch.${item}=${data[item][idx]}`;
            urlArr.push(newStr);
          });
        } else {
          let newStr = `PackageDetailSearch.${item}=${data[item]}`;
          urlArr.push(newStr);
        }
      }
      urlString = '?' + urlArr.join('&');
    }
  }
  try {
    return await packageServices.getPackageList(urlString);
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const getPackageById = createAsyncThunk('getPackageById', async (id, { dispatch, rejectWithValue }) => {
  try {
    const response = await packageServices.getPackageById(id);
    return response?.data;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const addPackage = createAsyncThunk('addPackage', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await packageServices.addPackage(data);
    await dispatch(getPackageList());
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const updatePackage = createAsyncThunk('updatePackage', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await packageServices.updatePackage(data);
    await dispatch(getPackageList());
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

const initialState = {
  packages: [],
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
};

export const packageSlice = createSlice({
  name: 'packageSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPackageList.fulfilled, (state, action) => {
      state.packages = action?.payload?.data?.items.reverse();
      state.tableProperty = action?.payload?.data?.pagedProperty;
    });
    builder.addCase(getPackageList.rejected, (state) => {
      state.packages = [];
    });
  },
});
