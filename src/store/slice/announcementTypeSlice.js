import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import announcementTypeServices from '../../services/announcementType.services';

export const getAnnouncementType = createAsyncThunk(
  'AnnouncementType/getAnnouncementType',
  async ({ data, params } = {}, { dispatch, rejectWithValue }) => {
    try {
      return await announcementTypeServices.getAnnouncementType(data, params);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addAnnouncementType = createAsyncThunk(
  'AnnouncementType/addAnnouncementType',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await announcementTypeServices.addAnnouncementType(data);
      await dispatch(getAnnouncementType());
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const updateAnnouncementType = createAsyncThunk(
  'AnnouncementType/updateAnnouncementType',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await announcementTypeServices.updateAnnouncementType(data);
      await dispatch(getAnnouncementType());
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  announcementTypes: [],
};

export const announcementTypeSlice = createSlice({
  name: 'announcementTypeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAnnouncementType.fulfilled, (state, action) => {
      state.announcementTypes = action?.payload?.data?.items;
    });
    builder.addCase(getAnnouncementType.rejected, (state) => {
      state.announcementTypes = [];
    });
  },
});
