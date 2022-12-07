import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import targetSentenceServices from '../../services/targetSentence.services';

export const getTargetSentenceList = createAsyncThunk(
  'getTargetSentenceList',
  async (data, { rejectWithValue }) => {
    try {
      const response = await targetSentenceServices.targetSentenceGetList(data?.params);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.data);
    }
  },
);
export const getTargetSentenceAdd = createAsyncThunk(
  'getTargetSentenceAdd',
  async (data, { rejectWithValue }) => {
    try {
      const response = await targetSentenceServices.targetSentenceAdd(data);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.data);
    }
  },
);
export const getTargetSentenceUpdate = createAsyncThunk(
  'getTargetSentenceUpdate',
  async (data, { rejectWithValue }) => {
    try {
      const response = await targetSentenceServices.targetSentenceUpdate(data);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.data);
    }
  },
);
export const getTargetSentenceDelete = createAsyncThunk(
  'getTargetSentenceDelete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await targetSentenceServices.targetSentenceDelete(data);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.data);
    }
  },
);
const initialState = {
  targetSentenceList: [],
};

export const targetSentenceSlice = createSlice({
  name: 'targetSentenceSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTargetSentenceList.fulfilled, (state, action) => {
      state.targetSentenceList = action?.payload?.data;
    });
  },
});
