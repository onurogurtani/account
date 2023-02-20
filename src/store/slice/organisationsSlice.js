import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import organisationsServices from '../../services/organisations.services';

export const getByFilterPagedOrganisations = createAsyncThunk(
  'organisations/getByFilterPagedOrganisations',
  async (data = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await organisationsServices.getByFilterPagedOrganisations({
        organisationDetailSearch: { ...data, ...data?.body, body: undefined },
      });
      dispatch(setOrganisationDetailSearch(data));
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getOrganisationNames = createAsyncThunk(
  'organisations/getOrganisationNames',
  async (data = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await organisationsServices.getOrganisationNames(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getByOrganisationId = createAsyncThunk(
  'organisations/getByOrganisationId',
  async (params = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await organisationsServices.getByOrganisationId(params);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addOrganisation = createAsyncThunk(
  'organisations/addOrganisation',
  async (data = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await organisationsServices.addOrganisation(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const updateOrganisation = createAsyncThunk(
  'organisations/updateOrganisation',
  async (data = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await organisationsServices.updateOrganisation(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const UpdateOrganisationIsActive = createAsyncThunk(
  'organisations/UpdateOrganisationIsActive',
  async (data = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await organisationsServices.UpdateOrganisationIsActive(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  organisations: [],
  organisationDetailSearch: {
    pageNumber: 1,
    pageSize: 10,
    body: {},
    orderBy: 'UpdateTimeDESC',
  },
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
};

export const organisationsSlice = createSlice({
  name: 'organisationsSlice',
  initialState,
  reducers: {
    setOrganisationDetailSearch: (state, action) => {
      state.organisationDetailSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getByFilterPagedOrganisations.fulfilled, (state, action) => {
      state.organisations = action?.payload?.data?.items;
      state.tableProperty = action?.payload?.data?.pagedProperty;
    });
    builder.addCase(getByFilterPagedOrganisations.rejected, (state) => {
      state.organisations = [];
      state.tableProperty = {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: 0,
      };
    });
  },
});

export const { setOrganisationDetailSearch } = organisationsSlice.actions;
