import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getByFilterPagedParamsHelper } from '../../utils/utils';
import workPlanService from '../../services/workPlan.service';

export const getByFilterPagedQuestionOfExams = createAsyncThunk(
  'getByFilterPagedQuestionOfExams',
  async (data = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const params = getByFilterPagedParamsHelper(data, 'QuestionOfExamDetailSearch.');
      const response = await workPlanService.getByFilterPagedQuestionOfExams(params);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  activeKey: '0',
  subjectChooseTab: {
    formData: {},
    selectedRowVideo: {},
    filterObject: {},
    videos: [],
    tableProperty: {
      currentPage: 1,
      // page: 1,
      pageSize: 10,
      totalCount: 0,
    },
  },
  reinforcementTab: {},
  evaluationTab: {},
  outQuestionTab: {
    dataList: [],
    selectedRowsData: [],
    lessonSubSubjectList: [],
    tableProperty: {
      currentPage: 1,
      // page: 1,
      pageSize: 10,
      totalCount: 0,
    },
  },
  practiceQuestionTab: {
    selectedRowsVideo: [],
    videos: [],
    tableProperty: {
      currentPage: 1,
      // page: 1,
      pageSize: 10,
      totalCount: 0,
    },
  },
};

export const workPlanSlice = createSlice({
  name: 'workPlanSlice',
  initialState,
  reducers: {
    resetAllData: (state, action) => {
      state.activeKey = '0';
      state.subjectChooseTab.selectedRowVideo = {};
      state.subjectChooseTab.formData = {};
      state.subjectChooseTab.filterObject = {};
      state.subjectChooseTab.videos = [];
      state.subjectChooseTab.tableProperty = { currentPage: 1, pageSize: 10, totalCount: 0 };
      state.practiceQuestionTab.videos = [];
      state.practiceQuestionTab.tableProperty = { currentPage: 1, pageSize: 10, totalCount: 0 };
      state.practiceQuestionTab.selectedRowsVideo = [];
      state.outQuestionTab.dataList = [];
      state.outQuestionTab.selectedRowsData = [];
      state.outQuestionTab.lessonSubSubjectList = [];
      state.outQuestionTab.tableProperty = { currentPage: 1, pageSize: 10, totalCount: 0 };
    },
    onChangeActiveKey: (state, action) => {
      state.activeKey = action?.payload;
    },
    selectedSubjectTabRowVideo: (state, action) => {
      state.subjectChooseTab.selectedRowVideo = action?.payload;
    },
    setSubjectChooseData: (state, action) => {
      state.subjectChooseTab.formData = action?.payload;
    },
    setSubjectChooseFilterData: (state, action) => {
      state.subjectChooseTab.filterObject = action?.payload;
    },
    setSubjectChooseVideoFilteredList: (state, action) => {
      state.subjectChooseTab.videos = action?.payload?.data?.items;
      state.subjectChooseTab.tableProperty = action?.payload?.data?.pagedProperty;
    },
    resetSubjectChooseVideoList: (state, action) => {
      state.subjectChooseTab.videos = [];
    },
    setPracticeQuestionVideoFilteredList: (state, action) => {
      state.practiceQuestionTab.videos = action?.payload?.data?.items;
      state.practiceQuestionTab.tableProperty = action?.payload?.data?.pagedProperty;
    },
    resetPracticeQuestionVideoList: (state, action) => {
      state.practiceQuestionTab.videos = [];
    },
    selectedPracticeQuestionTabRowsVideo: (state, action) => {

      if (action.payload === undefined) {
        state.practiceQuestionTab.selectedRowsVideo = [];
      } else {
        const res = state.practiceQuestionTab?.selectedRowsVideo.filter((item) => item.id === action.payload.id);

        if (res.length > 0) {
          state.practiceQuestionTab.selectedRowsVideo = state.practiceQuestionTab?.selectedRowsVideo.filter((item) => item.id !== action.payload.id);
        } else {
          state.practiceQuestionTab.selectedRowsVideo = [...state.practiceQuestionTab.selectedRowsVideo, action?.payload];
        }
      }
    },
    setOutQuestionTabLessonSubSubjectList: (state, action) => {
      if (action.payload === undefined) {
        state.outQuestionTab.lessonSubSubjectList = [];
      } else {
        state.outQuestionTab.lessonSubSubjectList = action?.payload?.data?.items;
      }
    },
    resetOutQuestionTabVideoList: (state, action) => {
      state.outQuestionTab.dataList = [];
    },
    selectedOutQuestionTabRowsVideo: (state, action) => {
      if (action.payload === undefined) {
        state.outQuestionTab.selectedRowsData = [];
      } else {
        const res = state.outQuestionTab?.selectedRowsData.filter((item) => item.id === action.payload.id);

        if (res.length > 0) {
          state.outQuestionTab.selectedRowsData = state.outQuestionTab?.selectedRowsData.filter((item) => item.id !== action.payload.id);
        } else {
          state.outQuestionTab.selectedRowsData = [...state.outQuestionTab.selectedRowsData, action?.payload];
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getByFilterPagedQuestionOfExams.fulfilled, (state, action) => {
      state.outQuestionTab.dataList = action?.payload?.data?.items;
      state.outQuestionTab.tableProperty = action?.payload?.data?.pagedProperty || {};
    });
    builder.addCase(getByFilterPagedQuestionOfExams.rejected, (state, action) => {
      state.outQuestionTab.dataList = [];
      state.outQuestionTab.tableProperty = { currentPage: 1, pageSize: 10, totalCount: 0 };
    });
  },
});

export const {
  onChangeActiveKey,
  selectedSubjectTabRowVideo,
  setSubjectChooseData,
  setSubjectChooseFilterData,
  setSubjectChooseVideoFilteredList,
  resetSubjectChooseVideoList,
  setPracticeQuestionVideoFilteredList,
  resetPracticeQuestionVideoList,
  selectedPracticeQuestionTabRowsVideo,
  resetAllData,
  setOutQuestionTabLessonSubSubjectList,
  resetOutQuestionTabVideoList,
  selectedOutQuestionTabRowsVideo,
} = workPlanSlice.actions;
