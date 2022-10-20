import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import videoServices from '../../services/video.services';

export const addVideo = createAsyncThunk(
  'addVideoCategory',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await videoServices.addVideo(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addVideoCategory = createAsyncThunk(
  'addVideoCategory',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await videoServices.addVideoCategory(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getVideoCategoryList = createAsyncThunk(
  'getVideoCategoryList',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await videoServices.getVideoCategoryList(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const deleteVideoDocumentFile = createAsyncThunk(
  'deleteVideoDocumentFile',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await videoServices.deleteVideoDocumentFile(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addVideoQuestionsExcel = createAsyncThunk(
  'addVideoQuestionsExcel',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await videoServices.addVideoQuestionsExcel(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const downloadVideoQuestionsExcel = createAsyncThunk(
  'downloadVideoQuestionsExcel',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await videoServices.downloadVideoQuestionsExcel();
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getKalturaSessionKey = createAsyncThunk(
  'getKalturaSessionKey',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await videoServices.getKalturaSessionKey();
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getAllIntroVideoList = createAsyncThunk(
  'getAllIntroVideoList',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await videoServices.getAllIntroVideoList();
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getAllVideoKeyword = createAsyncThunk(
  'getAllVideoKeyword',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await videoServices.getAllVideoKeyword();
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  activeKey: '0',
  introVideos: [],
  values: {},
  keywords: [],
};

export const videoSlice = createSlice({
  name: 'videoSlice',
  initialState,
  reducers: {
    onChangeActiveKey: (state, action) => {
      state.activeKey = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllIntroVideoList.fulfilled, (state, action) => {
      state.introVideos = action?.payload?.data?.items;
    });
    builder.addCase(getAllIntroVideoList.rejected, (state) => {
      state.introVideos = [];
    });
    builder.addCase(getAllVideoKeyword.fulfilled, (state, action) => {
      state.keywords = action?.payload?.data;
    });
    builder.addCase(getAllVideoKeyword.rejected, (state) => {
      state.keywords = [];
    });
  },
});

export const { onChangeActiveKey } = videoSlice.actions;
