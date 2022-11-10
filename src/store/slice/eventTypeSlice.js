import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import eventTypeServices from '../../services/eventType.services';

export const getEventTypes = createAsyncThunk(
  'getEventTypeList',
  async (data, { dispatch, rejectWithValue }) => {
    let urlString;
    if (data) {
      console.log(data);
      let urlArr = [];
      for (const [key, value] of Object.entries(data)) {
        console.log(`${key}: ${value}`);
        let newStr = `EventTypeDetailSearch.${key}=${value}`;
        urlArr.push(newStr);
      }
      console.log(urlArr);
      if (!data.IsActive) {
        //BUNU DA KALDIRMAM LAZIM..
        let newStr = 'EventTypeDetailSearch.IsActive=true';
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
      console.log(urlString)
    } else {
      urlString =
        'EventTypeDetailSearch.IsActive=true&EventTypeDetailSearch.OrderBy=IdDesc&EventTypeDetailSearch.PageNumber=1&EventTypeDetailSearch.PageSize=10';
    }

    try {
      const response = await eventTypeServices.getEventTypeList(urlString);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
      console.log(error);
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

    //bu değişken olmalı
    IsActive:true,
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
      console.log(action?.payload);
      state.eventTypes = action?.payload?.data?.items;
      state.tableProperty = action?.payload?.data?.pagedProperty || {};
    });
    builder.addCase(getEventTypes.rejected, (state) => {
      state.eventTypes = [];
    });
  },
});
export const { setFilterObject } = eventTypeSlice.actions;
