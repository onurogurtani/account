import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import contractTypeServices from '../../services/contractType.service';

export const getContractTypeList = createAsyncThunk(
  'getContractTypeList',
  async ({ data } = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await contractTypeServices.getContractType(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const getContractTypeAll = createAsyncThunk(
  'getContractTypeAll',
  async ({ data } = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await contractTypeServices.getContractTypeAll(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const addContractType = createAsyncThunk('addContractType', async (data = {}, { dispatch, rejectWithValue }) => {
  try {
    const response = await contractTypeServices.addContractType(data);
    return response;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error?.data);
  }
});
export const updateContractType = createAsyncThunk(
  'updateContractType',
  async (data = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await contractTypeServices.updateContractType(data);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  contractTypeList: [],
  contractTypeAllList: [],
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
};

export const contractTypeSlice = createSlice({
  name: 'contractTypeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContractTypeList.fulfilled, (state, action) => {
      state.contractTypeList = action?.payload?.data?.items;
      state.tableProperty = action?.payload?.data?.pagedProperty;
    });
    builder.addCase(getContractTypeAll.fulfilled, (state, action) => {
      state.contractTypeAllList = action?.payload?.data?.items;
    });
  },
});
