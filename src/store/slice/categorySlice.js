import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryServices from '../../services/category.services';


export const getByFilterPagedCategoriesQuery = createAsyncThunk(
  'category/getByFilterPagedCategoriesQuery',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await categoryServices.getByFilterPagedCategoriesQuery(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  categories: [],
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getByFilterPagedCategoriesQuery.fulfilled, (state, action) => {
      state.categories = action?.payload?.data?.items;
    });
    builder.addCase(getByFilterPagedCategoriesQuery.rejected, (state) => {
      state.categories = [];
    });
  },
});

