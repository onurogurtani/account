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
export const getFileUpload = createAsyncThunk('getFileUpload', async (data = {}, { dispatch, rejectWithValue }) => {
  try {
    const response = await questionIdentificationServices.fileUpload(data.data, data.options);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

const initialState = {
  questionOfExams: {},
  pagedProperty: {},
};

export const questionIdentificationSlice = createSlice({
  name: 'questionIdentificationSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getByFilterPagedQuestionOfExamsList.fulfilled, (state, action) => {
      state.questionOfExams = action?.payload?.data.items[0];
      state.pagedProperty = action?.payload?.data.pagedProperty;
    });
  },
});
