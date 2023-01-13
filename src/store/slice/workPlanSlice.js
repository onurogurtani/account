import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeKey: '0',
  subjectChooseTab: {
    selectedRowVideo: {},
    formData: {},
  },
  reinforcementTab: {},
  evaluationTab: {},
  outQuestionTab: {},
  practiceQuestionTab: {},
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
  },
  extraReducers: (builder) => {

  },
});

export const {
  onChangeActiveKey,
  selectedSubjectTabRowVideo,
  setSubjectChooseData,
} = workPlanSlice.actions;
