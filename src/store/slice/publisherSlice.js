import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import publisherServices from '../../services/publisher.services';

export const getPublisherList = createAsyncThunk(
  'getPublisherList',
  async ({ params, data } = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await publisherServices.getPublisherList(params);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const getPublisherListAdd = createAsyncThunk(
  'getPublisherListAdd',
  async (data = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await publisherServices.getPublisherAdd(data);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.data);
    }
  },
);
export const getPublisherUpdate = createAsyncThunk(
  'getPublisherUpdate',
  async (data = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await publisherServices.getPublisherUpdate(data);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  publisherList: [],
};

export const publisherSlice = createSlice({
  name: 'publisher',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPublisherList.fulfilled, (state, action) => {
      state.publisherList = action?.payload?.data;
    });
  },
});
