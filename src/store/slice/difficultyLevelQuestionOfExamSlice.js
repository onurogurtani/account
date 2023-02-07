import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import difficultyLevelQuestionOfExamServices from '../../services/difficultyLevelQuestionOfExam.services';

export const getByPagedListDifficultyLevelQuestionOfExam = createAsyncThunk(
  'difficultyLevelQuestionOfExam/getByPagedListDifficultyLevelQuestionOfExam',
  async (data = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await difficultyLevelQuestionOfExamServices.getByPagedListDifficultyLevelQuestionOfExam({
        ...data,
        ...data?.body,
        body: undefined,
      });
      dispatch(setDifficultyLevelQuestionOfExamDetailSearch(data));
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  difficultyLevelQuestionOfExams: [],
  difficultyLevelQuestionOfExamDetailSearch: {
    pagination: {
      pageNumber: 1,
      pageSize: 10,
    },
    body: {},
  },
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
};

export const difficultyLevelQuestionOfExamSlice = createSlice({
  name: 'difficultyLevelQuestionOfExamSlice',
  initialState,
  reducers: {
    setDifficultyLevelQuestionOfExamDetailSearch: (state, action) => {
      state.difficultyLevelQuestionOfExamDetailSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getByPagedListDifficultyLevelQuestionOfExam.fulfilled, (state, action) => {
      state.difficultyLevelQuestionOfExams = action?.payload?.data?.items;
      state.tableProperty = action?.payload?.data?.pagedProperty;
    });
    builder.addCase(getByPagedListDifficultyLevelQuestionOfExam.rejected, (state) => {
      state.difficultyLevelQuestionOfExams = [];
      state.tableProperty = {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: 0,
      };
    });
  },
});

export const { setDifficultyLevelQuestionOfExamDetailSearch } = difficultyLevelQuestionOfExamSlice.actions;
