import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import announcementServices from '../../services/announcement.services';

// export const announcementGetList = createAsyncThunk(
//   'announcement/getList',
//   async (body, { rejectWithValue }) => {
//     try {
//       return await announcementServices.announcementGetList();
//     } catch (error) {
//       return rejectWithValue(error?.data);
//     }
//   },
// );
// Get filter announcements
export const getByFilterPagedAnnouncements = createAsyncThunk(
  'announcement/GetByFilterPagedAnnouncements',
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      let urlString;
      if (data) {
        let urlArr = [];
        for (let item in data) {
          if (!!data[item]) {
            let newStr = `AnnouncementDetailSearch.${item}=${data[item]}`;
            urlArr.push(newStr);
          }
        }
        if (!data.OrderBy) {
          let newStr = `AnnouncementDetailSearch.OrderBy=idDESC`;
          urlArr.push(newStr);
        }
        if (!data.PageNumber) {
          let newStr = `AnnouncementDetailSearch.PageNumber=1`;
          urlArr.push(newStr);
        }
        if (!data.PageSize) {
          let newStr = `AnnouncementDetailSearch.PageSize=10`;
          urlArr.push(newStr);
        }
        urlString = urlArr.join('&');
      } else {
        urlString =
          'AnnouncementDetailSearch.OrderBy=insertDESC&AnnouncementDetailSearch.PageNumber=1&AnnouncementDetailSearch.PageSize=10';
      }
      const response = await announcementServices.getByFilterPagedAnnouncements(urlString);
      dispatch(setFilterObject(data));
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const addAnnouncement = createAsyncThunk(
  'addAnnouncement',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await announcementServices.addAnnouncement(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const addAnnouncementRole = createAsyncThunk(
  'addAnnouncementRole',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await announcementServices.addAnnouncementRole(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const editAnnouncement = createAsyncThunk(
  'editAnnouncement',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await announcementServices.editAnnouncement(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const deleteAnnouncement = createAsyncThunk(
  'deleteAnnouncement',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await announcementServices.deleteAnnouncement(id);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const setPublishedAnnouncements = createAsyncThunk(
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
      IsActive: true,
      IsPublished: '',
      EndDate: '',
      StartDate: '',
      OrderBy: '',
      PageNumber: 1,
      PageSize: 10,
    },
  },
  reducers: {
    setFilterObject: (state, action) => {
      state.filterObject = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(announcementGetList.fulfilled, (state, action) => {
    //   state.announcements = action?.payload?.data?.items || [];
    //   state.tableProperty = action?.payload?.data?.pagedProperty || {};
    // });
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
  },
});
export const { setFilterObject } = announcementSlice.actions;
