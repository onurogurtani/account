import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import eventsServices from '../../services/events.services';
import formServices from '../../services/forms.services';
import participantGroupsServices from '../../services/participantGroups.services';
import { getByFilterPagedParamsHelper } from '../../utils/utils';

export const getByFilterPagedEvents = createAsyncThunk(
  'events/getByFilterPagedEvents',
  async (data = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const params = getByFilterPagedParamsHelper(data, 'EventDetailSearch.');
      const response = await eventsServices.getByFilterPagedEvents(params);
      dispatch(setFilterObject(data));
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getByEventId = createAsyncThunk('events/getByEventId', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await eventsServices.getByEventId(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const addEvent = createAsyncThunk('events/addEvent', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await eventsServices.addEvent(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const getSurveyListWithSelectedSurveyCategory = createAsyncThunk(
  'events/getSurveyListWithSelectedSurveyCategory',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const urlString = `FormDetailSearch.CategoryOfFormId=${data}&FormDetailSearch.Status=true`;
      const response = await formServices.getByFilterPagedForms(urlString);
      const surveyListLength = response?.data?.items.length;
      if (!surveyListLength) {
        return rejectWithValue({
          message: 'Seçtiğiniz Kategoriye Ait Kayıtlı Anket Bulunamadı',
        });
      }
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

export const getEventNames = createAsyncThunk('events/getEventNames', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await eventsServices.getEventNames();
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const editEvent = createAsyncThunk('events/editEvent', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await eventsServices.editEvent(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await eventsServices.deleteEvent(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const getAllEventsKeyword = createAsyncThunk(
  'events/getAllEventsKeyword',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await eventsServices.getAllEventsKeyword();
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  events: [],
  currentEvent: {},
  surveyListWithSelectedSurveyCategory: [], //seçilen anket kategorisindeki anketler
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
    setSurveyListWithSelectedSurveyCategory: (state, action) => {
      state.surveyListWithSelectedSurveyCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getByFilterPagedEvents.fulfilled, (state, action) => {
      state.events = action?.payload?.data?.items;
      state.tableProperty = action?.payload?.data?.pagedProperty;
    });
    builder.addCase(getByFilterPagedEvents.rejected, (state) => {
      state.events = [];
      state.tableProperty = {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: 0,
      };
    });
    builder.addCase(getByEventId.fulfilled, (state, action) => {
      state.currentEvent = action?.payload?.data;
    });
    builder.addCase(getByEventId.rejected, (state) => {
      state.currentEvent = {};
    });
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.currentEvent = {};
    });
    builder.addCase(getSurveyListWithSelectedSurveyCategory.fulfilled, (state, action) => {
      state.surveyListWithSelectedSurveyCategory = action?.payload?.data?.items;
    });
    builder.addCase(getSurveyListWithSelectedSurveyCategory.rejected, (state) => {
      state.surveyListWithSelectedSurveyCategory = [];
    });
  },
});

export const { setFilterObject, setSorterObject, setIsFilter, setSurveyListWithSelectedSurveyCategory } =
  eventsSlice.actions;
