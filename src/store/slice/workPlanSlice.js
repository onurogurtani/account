import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getByFilterPagedParamsHelper } from '../../utils/utils';
import workPlanService from '../../services/workPlan.service';
import asEvServices from '../../services/asEv.service';

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

export const getByFilterPagedAsEvs = createAsyncThunk(
  'getByFilterPagedAsEvs',
  async (data = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const params = getByFilterPagedParamsHelper(data, 'AsEvsDetailSearch.');
      const response = await asEvServices.getFilterPagedAsEvs(params);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getAsEvQuestionOfExamsByAsEvId = createAsyncThunk(
  'getAsEvQuestionOfExamsByAsEvId',
  async (data = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await workPlanService.getAsEvQuestionOfExamsByAsEvId(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getByFilterPagedWorkPlans = createAsyncThunk(
  'getByFilterPagedWorkPlans',
  async (data = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await workPlanService.getByFilterPagedWorkPlans(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addWorkPlan = createAsyncThunk(
  'addWorkPlan',
  async (data = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await workPlanService.addWorkPlan(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getUsedVideoIdsQuery = createAsyncThunk(
  'getUsedVideoIdsQuery',
  async (data = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await workPlanService.getUsedVideoIdsQuery();
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  activeKey: '0',
  isExit: false,
  workPlanList: [],
  usedVideoIdsQueryListData: [],
  subjectChooseTab: {
    formData: {},
    selectedRowVideo: {},
    filterObject: {},
    schoolLevel: {},
    videos: [],
    tableProperty: {
      currentPage: 1,
      // page: 1,
      pageSize: 10,
      totalCount: 0,
    },
  },
  reinforcementTab: {},
  evaluationTab: {
    dataList: [],
    questionList: [],
    tableProperty: {
      currentPage: 1,
      // page: 1,
      pageSize: 10,
      totalCount: 0,
    },
    selectedRowData: {},
  },
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
  isFilter: false,
  filterObject: {},
  sorterObject: {},
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 0,
    totalCount: 0,
  },
};

export const workPlanSlice = createSlice({
  name: 'workPlanSlice',
  initialState,
  reducers: {
    resetAllData: (state, action) => {
      state.activeKey = '0';
      // state.isExit = false;
      state.subjectChooseTab.selectedRowVideo = {};
      state.subjectChooseTab.formData = {};
      state.subjectChooseTab.filterObject = {};
      state.subjectChooseTab.schoolLevel = {};
      state.subjectChooseTab.videos = [];
      state.subjectChooseTab.tableProperty = { currentPage: 1, pageSize: 10, totalCount: 0 };
      state.practiceQuestionTab.videos = [];
      state.practiceQuestionTab.tableProperty = { currentPage: 1, pageSize: 10, totalCount: 0 };
      state.practiceQuestionTab.selectedRowsVideo = [];
      state.outQuestionTab.dataList = [];
      state.outQuestionTab.selectedRowsData = [];
      state.evaluationTab.selectedRowData = {};
      state.evaluationTab.dataList = [];
      state.evaluationTab.tableProperty = { currentPage: 1, pageSize: 10, totalCount: 0 };
      state.outQuestionTab.lessonSubSubjectList = [];
      state.outQuestionTab.tableProperty = { currentPage: 1, pageSize: 10, totalCount: 0 };
    },
    onChangeActiveKey: (state, action) => {
      state.activeKey = action?.payload;
    },
    setIsExit: (state, action) => {
      state.isExit = action?.payload;
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
    setSubjectChooseSchoolLevel: (state, action) => {
      state.subjectChooseTab.schoolLevel = action?.payload;
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
    selectedOutQuestionTabRowsData: (state, action) => {
      console.log('selectedRowsDataOut', state.outQuestionTab.selectedRowsData);
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
    selectedEvaluationTabRowData: (state, action) => {
      state.evaluationTab.selectedRowData = action?.payload;
    },
    setEvaluationFilteredList: (state, action) => {
      state.evaluationTab.dataList = action?.payload?.data?.items;
      state.evaluationTab.tableProperty = action?.payload?.data?.pagedProperty;
    },
    resetEvaluationDataList: (state, action) => {
      state.evaluationTab.questionList = [];
    },
    resetEvaluationQuestionList: (state, action) => {
      state.evaluationTab.questionList = [];
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
    builder.addCase(getByFilterPagedAsEvs.fulfilled, (state, action) => {
      state.evaluationTab.dataList = action?.payload?.data?.items;
      state.evaluationTab.tableProperty = action?.payload?.data?.pagedProperty || {};
    });
    builder.addCase(getByFilterPagedAsEvs.rejected, (state, action) => {
      state.evaluationTab.dataList = [];
      state.evaluationTab.tableProperty = { currentPage: 1, pageSize: 10, totalCount: 0 };
    });
    builder.addCase(getAsEvQuestionOfExamsByAsEvId.fulfilled, (state, action) => {
      state.evaluationTab.questionList = action?.payload?.data?.items;
    });
    builder.addCase(getAsEvQuestionOfExamsByAsEvId.rejected, (state, action) => {
      state.evaluationTab.questionList = [];
    });
    builder.addCase(getByFilterPagedWorkPlans.fulfilled, (state, action) => {
      state.workPlanList = action?.payload?.data?.items || [];
      state.tableProperty = action?.payload?.data?.pagedProperty || {};
    });
    builder.addCase(getByFilterPagedWorkPlans.rejected, (state, action) => {
      state.workPlanList = [];
      state.tableProperty = {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: 0,
      };
    });
    builder.addCase(getUsedVideoIdsQuery.fulfilled, (state, action) => {
      state.usedVideoIdsQueryListData = action?.payload?.data;
    });
    builder.addCase(getUsedVideoIdsQuery.rejected, (state, action) => {
      state.usedVideoIdsQueryListData = [];
    });
  },
});

export const {
  onChangeActiveKey,
  setIsExit,
  selectedSubjectTabRowVideo,
  setSubjectChooseData,
  setSubjectChooseFilterData,
  setSubjectChooseVideoFilteredList,
  resetSubjectChooseVideoList,
  setSubjectChooseSchoolLevel,
  setPracticeQuestionVideoFilteredList,
  resetPracticeQuestionVideoList,
  selectedPracticeQuestionTabRowsVideo,
  resetAllData,
  setOutQuestionTabLessonSubSubjectList,
  resetOutQuestionTabVideoList,
  selectedOutQuestionTabRowsData,
  selectedEvaluationTabRowData,
  setEvaluationFilteredList,
  resetEvaluationDataList,
  resetEvaluationQuestionList
} = workPlanSlice.actions;
