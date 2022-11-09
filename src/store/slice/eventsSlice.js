import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import eventsServices from '../../services/events.services';
import formServices from '../../services/forms.services';
import participantGroupsServices from '../../services/participantGroups.services';

export const addEvent = createAsyncThunk(
  'events/addEvent',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await eventsServices.addEvent(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getSurveyWithFilterSurveyCategory = createAsyncThunk(
  'events/getSurveyWithFilterSurveyCategory',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const urlString = `FormDetailSearch.CategoryId=${data}&FormDetailSearch.Status=true`;
      const response = await formServices.getByFilterPagedForms(urlString);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getParticipantGroupsList = createAsyncThunk(
  'events/getParticipantGroupsList',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await participantGroupsServices.getParticipantGroupsList();
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  events: [],
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
  filterObject: {},
};

export const eventsSlice = createSlice({
  name: 'eventsSlice',
  initialState,
  reducers: {},
  //   extraReducers: (builder) => {
  //     builder.addCase(getFilteredPagedForms.fulfilled, (state, action) => {
  //       state.formList = action?.payload?.data?.items || [];
  //       state.tableProperty = action?.payload?.data?.pagedProperty || {};
  //     });
  //   },
});

// export const { xyz } = eventsSlice.actions;
