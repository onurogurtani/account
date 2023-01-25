import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import booksServices from '../../services/books.service';
import { getByFilterPagedParamsHelper } from '../../utils/utils';

export const getByFilterPagedBooks = createAsyncThunk(
  'getByFilterPagedBooks',
  async (data = {}, { dispatch, rejectWithValue }) => {
    try {
      const params = getByFilterPagedParamsHelper(data, 'BookDetailSearch.');
      const response = await booksServices.GetByFilterPagedGroups(params);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);


const initialState = {
  booksList: [],
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 0,
    totalCount: 0,
  },
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getByFilterPagedBooks.fulfilled, (state, action) => {
      state.booksList = action?.payload?.data?.items || [];
      state.tableProperty = action?.payload?.data?.pagedProperty || {};
    });
    builder.addCase(getByFilterPagedBooks.rejected, (state, action) => {
      state.booksList = [];
      state.tableProperty = {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: 0,
      };
    });
  },
});

