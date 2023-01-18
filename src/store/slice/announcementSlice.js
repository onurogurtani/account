import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import announcementServices from '../../services/announcement.services';
import fileServices from '../../services/file.services';
import { getByFilterPagedParamsHelper } from '../../utils/utils';

export const getByFilterPagedAnnouncements = createAsyncThunk(
  'announcement/GetByFilterPagedAnnouncements',
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      const params = getByFilterPagedParamsHelper(data, 'AnnouncementDetailSearch.');
      const response = await announcementServices.getByFilterPagedAnnouncements(params);
      dispatch(setFilterObject(data));
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getByFilterPagedAnnouncementTypes = createAsyncThunk(
  'announcement/GetByFilterPagedAnnouncementTypes',
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      let urlString = 'AnnouncementTypeDetailSearch.PageNumber=1&AnnouncementTypeDetailSearch.PageSize=1000';
      const response = await announcementServices.getByFilterAnnouncementTypes(urlString);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const addAnnouncement = createAsyncThunk(
  'announcement/addAnnouncement',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await announcementServices.addAnnouncement(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const createOrUpdateAnnouncementRole = createAsyncThunk(
  'createOrUpdateAnnouncementRole',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await announcementServices.createOrUpdateAnnouncementRole(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const editAnnouncement = createAsyncThunk('editAnnouncement', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await announcementServices.editAnnouncement(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const deleteAnnouncement = createAsyncThunk('deleteAnnouncement', async ({ id }, { rejectWithValue }) => {
  try {
    const data = { id: id };
    const response = await announcementServices.deleteAnnouncement(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const setPublishAnnouncements = createAsyncThunk(
  'setPublishedAnnouncements',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await announcementServices.setPublishedAnnouncements(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const setUnPublishAnnouncements = createAsyncThunk(
  'setUnPublishedAnnouncements',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await announcementServices.setUnPublishedAnnouncements(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const setArchiveAnnouncements = createAsyncThunk(
  'setArchiveAnnouncements',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await announcementServices.setArchiveAnnouncements(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const setActiveAnnouncements = createAsyncThunk(
  'setActiveAnnouncements',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await announcementServices.setActiveAnnouncements(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const getAvatarUpload = createAsyncThunk('getAvatarUpload', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await fileServices.uploadFileBaseApi(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const announcementSlice = createSlice({
  name: 'announcement',
  initialState: {
    announcements: [],
    tableProperty: {
      currentPage: 1,
      page: 1,
      pageSize: 0,
      totalCount: 0,
    },
    filterObject: {
      HeadText: '',
      Text: '',
      IsActive: '',
      IsPublished: '',
      EndDate: '',
      StartDate: '',
      OrderBy: '',
      PageNumber: 1,
      PageSize: 10,
    },
    announcementTypes: [],
    updateAnnouncementObject: {},
  },
  reducers: {
    setFilterObject: (state, action) => {
      state.filterObject = action.payload;
    },
    setUpdateAnnouncementObject: (state, action) => {
      state.updateAnnouncementObject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getByFilterPagedAnnouncements.fulfilled, (state, action) => {
      state.announcements = action?.payload?.data?.items || [];
      state.tableProperty = action?.payload?.data?.pagedProperty || {};
    });
    builder.addCase(getByFilterPagedAnnouncements.rejected, (state, action) => {
      state.announcements = [];
      state.tableProperty = {
        currentPage: 1,
        page: 1,
        pageSize: 0,
        totalCount: 0,
      };
    });
    builder.addCase(getByFilterPagedAnnouncementTypes.fulfilled, (state, action) => {
      state.announcementTypes = action?.payload?.data?.items || state.announcementTypes;
    });
  },
});

export const { setFilterObject, setAnnouncementData, setUpdateAnnouncementObject } = announcementSlice.actions;
