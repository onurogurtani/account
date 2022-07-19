import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import customersServices from '../../services/customers.services';

export const userCustomersGetList = createAsyncThunk(
  'userCustomersGetList',
  async (body, { rejectWithValue }) => {
    try {
      return await customersServices.userCustomersGetList(body);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const customerLogosGetList = createAsyncThunk(
  'customerLogosGetList',
  async (body, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      const vouId = 1; // ticket restoran
      if (!customerId && !vouId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }
      return await customersServices.customerLogosGetList({ customerId: customerId, vouId: vouId });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  customerList: [],
  selectedCustomer: {},
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userCustomersGetList.fulfilled, (state, action) => {
      const length = action?.payload?.data?.length || 0;
      state.selectedCustomer = length > 0 ? action?.payload?.data[0] : {};
      state.customerList = length > 1 ? action?.payload?.data : [];
    });
    builder.addCase(userCustomersGetList.rejected, (state) => {
      state.customerList = [];
      state.selectedCustomer = {};
    });
  },
});

export const { setSelectedCustomer } = customerSlice.actions;
