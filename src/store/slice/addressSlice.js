import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import addressServices from '../../services/address.services';

export const addressSave = createAsyncThunk(
  'addressSave',
  async (body, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({
          message: 'Please select a customer',
        });
      }
      return await addressServices.addressSave({ ...body, customerId: customerId });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addressGetList = createAsyncThunk(
  'addressGetList',
  async (body, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      return await addressServices.addressGetList(customerId);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addressList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addressGetList.fulfilled, (state, action) => {
      state.addressList = action?.payload?.data || [];
    });
  },
});
