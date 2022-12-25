import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import publisherBookServices from '../../services/publisherBook.services';

export const getPublisherBookList = createAsyncThunk(
  'getPublisherBookList',
  async ({ params = {}, data = {} } = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await publisherBookServices.getPublisherBookList(params);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const getPublisherBookAdd = createAsyncThunk(
  'getPublisherBookAdd',
  async (data = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await publisherBookServices.getPublisherBookAdd(data);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.data);
    }
  },
);
export const getPublisherBookUpdate = createAsyncThunk(
  'getPublisherBookUpdate',
  async (data = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await publisherBookServices.getPublisherBookUpdate(data);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  publisherBookList: [],
};

export const publisherBookSlice = createSlice({
  name: 'publisherBook',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPublisherBookList.fulfilled, (state, action) => {
      state.publisherBookList = action?.payload?.data;
    });
  },
});
