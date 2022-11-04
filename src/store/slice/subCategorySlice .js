import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import subCategoryServices from '../../services/subCategory.services';


export const getByFilterPagedSubCategories = createAsyncThunk(
  'subCategory/getByFilterPagedSubCategories',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await subCategoryServices.getByFilterPagedSubCategories(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addSubCategory = createAsyncThunk(
  'subCategory/addSubCategory',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await subCategoryServices.addSubCategory(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const updateSubCategory = createAsyncThunk(
  'subCategory/updateSubCategory',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await subCategoryServices.updateSubCategory(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  subCategories: [],
}

export const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getByFilterPagedSubCategories.fulfilled, (state, action) => {
      state.subCategories = action?.payload?.data?.items;
    });
    builder.addCase(getByFilterPagedSubCategories.rejected, (state) => {
      state.subCategories = [];
    });
  },
});

