import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import trialExamServices from '../../services/trialExam.services';

export const getTrialExamList = createAsyncThunk(
  'getTrialExamList',
  async ({ params, data } = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await trialExamServices.getCurrentUser(params);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  trialExamList: [],
  trialExamFormData: {},
};

export const trialExamSlice = createSlice({
  name: 'trialExam',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTrialExamList.fulfilled, (state, action) => {
      state.trialExamList = action?.payload?.data;
    });
  },
});
