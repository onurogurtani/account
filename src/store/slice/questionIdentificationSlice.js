import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import questionIdentificationServices from '../../services/questionIdentification.services';

export const getByFilterPagedQuestionOfExamsList = createAsyncThunk(
  'getByFilterPagedQuestionOfExamsList',
  async (data = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await questionIdentificationServices.getByFilterPagedQuestionOfExams(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  questionOfExamsList: {},
};

export const questionIdentificationSlice = createSlice({
  name: 'questionIdentificationSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getByFilterPagedQuestionOfExamsList.fulfilled, (state, action) => {
      state.questionOfExamsList = action?.payload?.data;
    });
  },
});
