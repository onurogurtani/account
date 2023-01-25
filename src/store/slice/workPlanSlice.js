import { createSlice } from '@reduxjs/toolkit';

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
  outQuestionTab: {},
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
  },
  extraReducers: (builder) => {

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
} = workPlanSlice.actions;
