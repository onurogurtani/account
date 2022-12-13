import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import eventTypeServices from '../../services/eventType.services';

export const getEventTypes = createAsyncThunk(
  'getEventTypeList',
  async (data, { dispatch, rejectWithValue }) => {
    let urlString;
    if (data) {
      let urlArr = [];
      for (const [key, value] of Object.entries(data)) {
        let newStr = `EventTypeDetailSearch.${key}=${value}`;
        urlArr.push(newStr);
      }
      if (!data.OrderBy) {
        let newStr = `EventTypeDetailSearch.OrderBy=IdDESC`;
        urlArr.push(newStr);
      }
      if (!data.PageNumber) {
        let newStr = `EventTypeDetailSearch.PageNumber=1`;
        urlArr.push(newStr);
      }
      if (!data.PageSize) {
        let newStr = 'EventTypeDetailSearch.PageSize=10';
        urlArr.push(newStr);
      }
      
      urlString = urlArr.join('&');
    } else {
      urlString ='EventTypeDetailSearch.OrderBy=IdDesc&EventTypeDetailSearch.PageNumber=1&EventTypeDetailSearch.PageSize=10';
    }

    try {
      const response = await eventTypeServices.getEventTypeList(urlString);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addEventType = createAsyncThunk(
  'addEventType',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await eventTypeServices.addEventType(data);
      await dispatch(getEventTypes());
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const updateEventType = createAsyncThunk(
  'updateEventType',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await eventTypeServices.updateEventType(data);
      await dispatch(getEventTypes());
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  eventTypes: [],
  filterObject:{
    OrderBy:'idDESC',
    PageNumber:1,
    PageSize:10
  },
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
};

export const eventTypeSlice = createSlice({
  name: 'eventType',
  initialState,
  reducers: {
    setFilterObject: (state, action) => {
      state.filterObject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEventTypes.fulfilled, (state, action) => {
      state.eventTypes = action?.payload?.data?.items;
      state.tableProperty = action?.payload?.data?.pagedProperty || {};
    });
    builder.addCase(getEventTypes.rejected, (state) => {
      state.eventTypes = [];
    });
  },
});
export const { setFilterObject } = eventTypeSlice.actions;
