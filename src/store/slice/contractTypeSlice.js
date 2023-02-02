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
export const getContractTypeAdd = createAsyncThunk('getContractTypeAdd', async (data = {}, { dispatch, rejectWithValue }) => {
  try {
    const response = await contractTypeServices.getContractTypeAdd(data);
    return response;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error?.data);
  }
});
export const getContractTypeUpdate = createAsyncThunk(
  'getContractTypeUpdate',
  async (data = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await contractTypeServices.getContractTypeUpdate(data);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  contractTypeList: [],
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
  },
});
