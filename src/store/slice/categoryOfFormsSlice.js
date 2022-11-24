import { createAsyncThunk } from '@reduxjs/toolkit';
import categoryOfFormsServices from '../../services/categoryOfForms.services';

export const addFormCategory = createAsyncThunk(
  'Category/addFormCategory',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await categoryOfFormsServices.addFormCategory(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const editFormCategory = createAsyncThunk(
  'Category/editFormCategory',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await categoryOfFormsServices.editFormCategory(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getFormCategoryList = createAsyncThunk(
  'Category/getFormCategoryList',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await categoryOfFormsServices.getFormCategoryList(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
