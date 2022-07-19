import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import balanceTransferServices from '../../services/balanceTransfer.services';
import profileServices from '../../services/profile.services';

export const getCardBalanceList = createAsyncThunk(
  'getCardBalanceList',
  async ({ body, pageNumber, pageSize, type }, { getState, dispatch, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({});
      }
      const data = {
        customerId: customerId,
        ...body,
      };

      const response = await balanceTransferServices.getCardBalanceList({
        data,
        pageNumber: pageNumber || 1,
        pageSize: pageSize || 10,
      });

      if (type === 'exit') {
        dispatch(
          setExitFilterObject({
            body,
            pageNumber,
            pageSize,
          }),
        );
      } else {
        dispatch(
          setEntryFilterObject({
            body,
            pageNumber,
            pageSize,
          }),
        );
      }

      return {
        response,
        type,
      };
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addBalanceTransfers = createAsyncThunk(
  'addBalanceTransfers',
  async (body, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({});
      }

      const user = await profileServices.getCurrentUser();

      if (!user?.data?.userCode) {
        return rejectWithValue({});
      }

      const data = {
        customerId: customerId,
        userCode: user?.data?.userCode,
        ...body,
      };

      return await balanceTransferServices.addBalanceTransfers(data);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  exit: {
    list: [],
    tableProperty: {
      currentPage: 1,
      page: 1,
      pageSize: 10,
      totalCount: 0,
    },
    filterObject: {
      body: {},
      pageNumber: 1,
      pageSize: 10,
    },
  },

  entry: {
    list: [],
    tableProperty: {
      currentPage: 1,
      page: 1,
      pageSize: 10,
      totalCount: 0,
    },
    filterObject: {
      body: {},
      pageNumber: 1,
      pageSize: 10,
    },
  },
};

export const balanceTransferSlice = createSlice({
  name: 'balanceTransfer',
  initialState,
  reducers: {
    setExitFilterObject: (state, action) => {
      state.exit.filterObject = action.payload;
    },
    setEntryFilterObject: (state, action) => {
      state.entry.filterObject = action.payload;
    },
    setExitList: (state, action) => {
      state.exit.list = action.payload;
    },
    setEntryList: (state, action) => {
      state.entry.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCardBalanceList.fulfilled, (state, action) => {
      const { payload } = action;

      if (payload.type === 'exit') {
        state.exit.list = payload?.response?.data || [];
        state.exit.tableProperty =
          payload?.response?.data?.pagedProperty || initialState?.tableProperty;
      } else {
        state.entry.list = payload?.response?.data || [];
        state.entry.tableProperty =
          payload?.response?.data?.pagedProperty || initialState?.tableProperty;
      }
    });
  },
});

export const { setExitFilterObject, setEntryFilterObject, setExitList, setEntryList } =
  balanceTransferSlice.actions;
