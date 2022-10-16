import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import videoServices from '../../services/video.services';

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

const initialState = {
  activeKey: '0',
  values: {},
};

export const videoSlice = createSlice({
  name: 'videoSlice',
  initialState,
  reducers: {
    onChangeActiveKey: (state, action) => {
      state.activeKey = action?.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(getAllImages.fulfilled, (state, action) => {
  //       state.images = action?.payload?.data?.items;
  //     });
  //   },
});

export const { onChangeActiveKey } = videoSlice.actions;
