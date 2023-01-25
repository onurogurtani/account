import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import documentsServices from '../../services/documents.services';

export const getListDocuments = createAsyncThunk(
  'getListDocuments',
  async (body, { dispatch, rejectWithValue }) => {
    try {
      return await documentsServices.getListDocuments();
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  documentsList: [],
};

export const documentsSlice = createSlice({
  name: 'documentsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListDocuments.fulfilled, (state, action) => {
      state.documentsList = action?.payload?.data?.items;
    });
    builder.addCase(getListDocuments.rejected, (state) => {
      state.documentsList = [];
    });
  },
});
