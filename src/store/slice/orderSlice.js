import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderServices from '../../services/order.services';

export const orderGetPageList = createAsyncThunk(
  'orderGetPageList',
  async ({ body, pageNumber, pageSize }, { getState, dispatch, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({});
      }
      const data = {
        customerId: customerId,
        ...body,
      };

      const response = await orderServices.orderGetPageList({
        data,
        pageNumber: pageNumber || 1,
        pageSize: pageSize || 10,
      });
      dispatch(
        setFilterObject({
          body,
          pageNumber,
          pageSize,
        }),
      );
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const orderDetailsGetPageList = createAsyncThunk(
  'orderDetailsGetPageList',
  async ({ body, pageNumber, pageSize }, { rejectWithValue }) => {
    try {
      return await orderServices.orderDetailsGetPageList({
        data: body,
        pageNumber: pageNumber || 1,
        pageSize: pageSize || 10,
      });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const packagesGetPagedList = createAsyncThunk(
  'packagesGetPagedList',
  async ({ body, pageNumber, pageSize }, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({});
      }
      const data = {
        customerId: customerId,
        ...body,
      };

      return await orderServices.packagesGetPagedList({
        data,
        pageNumber: pageNumber || 1,
        pageSize: pageSize || 10,
      });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const packagesUpdate = createAsyncThunk(
  'packagesUpdate',
  async (body, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({});
      }

      return await orderServices.packagesUpdate({
        customerId: customerId,
        ...body,
      });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const orderInfosGetList = createAsyncThunk(
  'orderInfosGetList',
  async (body, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({});
      }
      const data = {
        customerId: customerId,
        ...body,
      };

      return await orderServices.orderInfosGetList({ data, pageNumber: 1, pageSize: 10 });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const orderDelete = createAsyncThunk('orderDelete', async (body, { rejectWithValue }) => {
  try {
    return await orderServices.orderDelete(body);
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const paymentLinksAdd = createAsyncThunk(
  'paymentLinksAdd',
  async (body, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      const customerName = await getState()?.customer?.selectedCustomer?.customerName;
      if (!customerId) {
        return rejectWithValue({});
      }

      return await orderServices.paymentLinksAdd({
        customerId: customerId,
        customerName: customerName,
        ...body,
      });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getMailList = createAsyncThunk('getMailList', async (body, { rejectWithValue }) => {
  try {
    return await orderServices.getMailList(body);
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

const initialState = {
  list: [],
  mailList: [],
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
  selectedOrder: {},
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setFilterObject: (state, action) => {
      state.filterObject = action.payload;
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(orderGetPageList.fulfilled, (state, action) => {
      state.list = action?.payload?.data?.items || [];
      state.tableProperty = action?.payload?.data?.pagedProperty || initialState?.tableProperty;
    });
    builder.addCase(orderGetPageList.rejected, (state, action) => {
      state.list = initialState.list;
      state.tableProperty = initialState?.tableProperty;
    });
    builder.addCase(getMailList.fulfilled, (state, action) => {
      state.mailList = action?.payload?.data || [];
    });
    builder.addCase(getMailList.rejected, (state, action) => {
      state.mailList = initialState.mailList;
    });
  },
});

export const { setFilterObject, setSelectedOrder } = orderSlice.actions;
