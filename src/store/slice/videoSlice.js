import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import videoServices from '../../services/video.services';
import { saveAs } from 'file-saver';

export const getByFilterPagedVideos = createAsyncThunk(
  'videos/getByFilterPagedVideos',
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      let urlString;
      if (data) {
        let urlArr = [];
        for (let item in data) {
          if (data[item] !== undefined) {
            if (Array.isArray(data[item])) {
              data[item]?.map((element, idx) => {
                let newStr = `VideoDetailSearch.${item}=${data[item][idx]}`;
                urlArr.push(newStr);
              });
            } else {
              let newStr = `VideoDetailSearch.${item}=${data[item]}`;
              urlArr.push(newStr);
            }
          }
        }
        if (!data.OrderBy) {
          let newStr = `VideoDetailSearch.OrderBy=UpdateTimeDESC`;
          urlArr.push(newStr);
        }
        if (!data.PageNumber) {
          let newStr = `VideoDetailSearch.PageNumber=1`;
          urlArr.push(newStr);
        }
        if (!data.PageSize) {
          let newStr = `VideoDetailSearch.PageSize=10`;
          urlArr.push(newStr);
        }
        urlString = urlArr.join('&');
      } else {
        urlString =
          'VideoDetailSearch.OrderBy=UpdateTimeDESC&VideoDetailSearch.PageNumber=1&VideoDetailSearch.PageSize=10';
      }
      const response = await videoServices.getByFilterPagedVideos(urlString);
      dispatch(setFilterObject(data));
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getByVideoId = createAsyncThunk(
  'videos/getByVideoId',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await videoServices.getByVideoId(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addVideo = createAsyncThunk(
  'videos/addVideo',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await videoServices.addVideo(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const editVideo = createAsyncThunk(
  'videos/editVideo',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await videoServices.editVideo(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addVideoCategory = createAsyncThunk(
  'videos/addVideoCategory',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await videoServices.addVideoCategory(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const editVideoCategory = createAsyncThunk(
  'videos/editVideoCategory',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await videoServices.editVideoCategory(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getVideoCategoryList = createAsyncThunk(
  'videos/getVideoCategoryList',
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
  'videos/deleteVideoDocumentFile',
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
  'videos/addVideoQuestionsExcel',
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
  'videos/downloadVideoQuestionsExcel',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await videoServices.downloadVideoQuestionsExcel();
      saveAs(response, `Soru Ekle Dosya Deseni ${Date.now()}.xlsx`);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getKalturaSessionKey = createAsyncThunk(
  'videos/getKalturaSessionKey',
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
  'videos/getAllIntroVideoList',
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
  'videos/getAllVideoKeyword',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await videoServices.getAllVideoKeyword();
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const deleteVideo = createAsyncThunk(
  'videos/deleteVideo',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await videoServices.deleteVideo(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  activeKey: '0',
  kalturaVideoId: null,
  kalturaIntroVideoId: null,
  introVideos: [],
  videos: [],
  isFilter: false,
  currentVideo: {},
  values: {},
  keywords: [],
  categories: [],
  filterObject: {},
  sorterObject: {},
  tableProperty: {
    currentPage: 1,
    // page: 1,
    pageSize: 10,
    totalCount: 0,
  },
};

export const videoSlice = createSlice({
  name: 'videoSlice',
  initialState,
  reducers: {
    onChangeActiveKey: (state, action) => {
      state.activeKey = action?.payload;
    },
    setKalturaIntroVideoId: (state, action) => {
      state.kalturaIntroVideoId = action.payload;
    },
    setKalturaVideoId: (state, action) => {
      state.kalturaVideoId = action.payload;
    },
    setFilterObject: (state, action) => {
      state.filterObject = action.payload;
    },
    setSorterObject: (state, action) => {
      state.sorterObject = action.payload;
    },
    setIsFilter: (state, action) => {
      state.isFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getByVideoId.fulfilled, (state, action) => {
      state.currentVideo = action?.payload?.data;
    });
    builder.addCase(getByVideoId.rejected, (state) => {
      state.currentVideo = {};
    });

    builder.addCase(getByFilterPagedVideos.fulfilled, (state, action) => {
      state.videos = action?.payload?.data?.items;
      state.tableProperty = action?.payload?.data?.pagedProperty;
    });
    builder.addCase(getByFilterPagedVideos.rejected, (state) => {
      state.videos = [];
      state.tableProperty = [];
    });

    builder.addCase(getVideoCategoryList.fulfilled, (state, action) => {
      state.categories = action?.payload?.data?.items;
    });
    builder.addCase(getVideoCategoryList.rejected, (state) => {
      state.categories = [];
    });
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

export const {
  onChangeActiveKey,
  setFilterObject,
  setSorterObject,
  setIsFilter,
  setKalturaIntroVideoId,
  setKalturaVideoId,
} = videoSlice.actions;
