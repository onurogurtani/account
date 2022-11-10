import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import eventsServices from '../../services/events.services';
import formServices from '../../services/forms.services';
import participantGroupsServices from '../../services/participantGroups.services';

export const getByFilterPagedEvents = createAsyncThunk(
  'events/getByFilterPagedEvents',
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      let urlString;
      if (data) {
        let urlArr = [];
        for (let item in data) {
          if (data[item] !== undefined) {
            if (Array.isArray(data[item])) {
              data[item]?.map((element, idx) => {
                let newStr = `EventDetailSearch.${item}=${data[item][idx]}`;
                urlArr.push(newStr);
              });
            } else {
              let newStr = `EventDetailSearch.${item}=${data[item]}`;
              urlArr.push(newStr);
            }
          }
        }
        if (!data.OrderBy) {
          let newStr = `EventDetailSearch.OrderBy=UpdateTimeDESC`;
          urlArr.push(newStr);
        }
        if (!data.PageNumber) {
          let newStr = `EventDetailSearch.PageNumber=1`;
          urlArr.push(newStr);
        }
        if (!data.PageSize) {
          let newStr = `EventDetailSearch.PageSize=10`;
          urlArr.push(newStr);
        }
        urlString = urlArr.join('&');
      } else {
        urlString =
          'EventDetailSearch.OrderBy=UpdateTimeDESC&EventDetailSearch.PageNumber=1&EventDetailSearch.PageSize=10';
      }
      const response = await eventsServices.getByFilterPagedEvents(urlString);
      dispatch(setFilterObject(data));
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

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

export const getEventNames = createAsyncThunk(
  'events/getEventNames',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await eventsServices.getEventNames();
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
  isFilter: false,
  filterObject: {},
  sorterObject: {},
};

export const eventsSlice = createSlice({
  name: 'eventsSlice',
  initialState,
  reducers: {
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
    builder.addCase(getByFilterPagedEvents.fulfilled, (state, action) => {
      state.events = action?.payload?.data?.items;
      state.tableProperty = action?.payload?.data?.pagedProperty;
    });
    builder.addCase(getByFilterPagedEvents.rejected, (state) => {
      state.events = [];
      state.tableProperty = [];
    });
  },
});

export const { setFilterObject, setSorterObject, setIsFilter } = eventsSlice.actions;
