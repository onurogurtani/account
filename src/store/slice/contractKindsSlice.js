import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import contractKindsServices from '../../services/contractKinds.service';

export const getContractKindsList = createAsyncThunk(
  'getContractKindsList',
  async ({ data } = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await contractKindsServices.getContractKinds(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const addContractKinds = createAsyncThunk('addContractKinds', async (data = {}, { dispatch, rejectWithValue }) => {
  try {
    const response = await contractKindsServices.addContractKinds(data);
    return response;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error?.data);
  }
});
export const updateContractKinds = createAsyncThunk(
  'updateContractKinds',
  async (data = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await contractKindsServices.updateContractKinds(data);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  contractKindsList: [],
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
};

export const contractKindsSlice = createSlice({
  name: 'contractKindsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContractKindsList.fulfilled, (state, action) => {
      state.contractKindsList = action?.payload?.data?.items;
      state.tableProperty = action?.payload?.data?.pagedProperty;
    });
  },
});
