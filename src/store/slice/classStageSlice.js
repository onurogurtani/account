import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import classStageServices from '../../services/classStage.services';

export const getAllClassStages = createAsyncThunk(
  'getAllClassStages',
  async (data,{ dispatch, rejectWithValue }) => {
    try {
      const response = await classStageServices.getClassList(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addNewClassStage = createAsyncThunk(
  'addNewClassStage',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await classStageServices.addClass(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const updateClassStage = createAsyncThunk(
  'updateClassStage',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await classStageServices.updateClass(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const deleteClassStage = createAsyncThunk(
    'deleteClassStage',
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const response = await classStageServices.deleteClass(data);
        return response;
      } catch (error) {
        return rejectWithValue(error?.data);
      }
    },
  );

const initialState = {
  allClassList:[],
};

export const classStageSlice = createSlice({
  name: 'classStageSlice',
  initialState,
  reducers: {
    clearClasses: (state, action) => {
      state.allClassList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllClassStages.fulfilled, (state, action) => {
      state.allClassList = action?.payload?.data?.items;
      state.pagedProperty = action?.payload?.data?.pagedProperty;
    });
  },
});
export const clearClasses = classStageSlice.actions;
