import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import questionMangementServices from '../../services/questionManagement.services';

export const getEducationYears = createAsyncThunk('getEducationYears', async (data, { dispatch, rejectWithValue }) => {
  try {
    return await questionMangementServices.getEducationYears();
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const getPublisherList = createAsyncThunk('getPublisherList', async (data, { dispatch, rejectWithValue }) => {
  try {
    return await questionMangementServices.getPublisherList();
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const getBookList = createAsyncThunk('getBookList', async (data, { dispatch, rejectWithValue }) => {
  try {
    return await questionMangementServices.getBookList(data);
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const uploadZipFileOfQuestion = createAsyncThunk(
  'uploadZipFileOfQuestion',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      return await questionMangementServices.uploadZipFileOfQuestion(data);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  educationYears: [],
  publisherList: [],
  bookList: [],
};

export const questionManagementSlice = createSlice({
  name: 'questionManagementSlice ',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEducationYears.fulfilled, (state, action) => {
      state.educationYears = action.payload.data?.items;
    });
    builder.addCase(getPublisherList.fulfilled, (state, action) => {
      state.publisherList = action.payload.data?.items;
    });
    builder.addCase(getBookList.fulfilled, (state, action) => {
      state.bookList = action.payload.data?.items;
    });
  },
});
