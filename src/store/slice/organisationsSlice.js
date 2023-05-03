import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import organisationsServices from '../../services/organisations.services';

export const getByFilterPagedOrganisations = createAsyncThunk(
  'organisations/getByFilterPagedOrganisations',
  async (data = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await organisationsServices.getByFilterPagedOrganisations({
        organisationDetailSearch: { ...data, ...data?.body, body: undefined },
      });
      dispatch(setFilterObject(data));
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

export const getOrganisationPackagesNames = createAsyncThunk(
  'organisations/getOrganisationPackagesNames',
  async (data = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await organisationsServices.getOrganisationPackagesNames(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getOrganisationManagerNames = createAsyncThunk(
  'organisations/getOrganisationManagerNames',
  async (data = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await organisationsServices.getOrganisationManagerNames(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getOrganisationDomainNames = createAsyncThunk(
  'organisations/getOrganisationDomainNames',
  async (data = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await organisationsServices.getOrganisationDomainNames(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getByOrganisationId = createAsyncThunk(
  'organisations/getByOrganisationId',
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await organisationsServices.getByOrganisationId(data?.Id);
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

export const UpdateOrganisationStatus = createAsyncThunk(
  'organisations/UpdateOrganisationStatus',
  async (data = {}, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await organisationsServices.UpdateOrganisationStatus(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const deleteOrganization = createAsyncThunk(
  'organisations/deleteOrganization', async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await organisationsServices.deleteOrganization(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  });

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

export const uploadImage = createAsyncThunk(
  'organisations/uploadImage', async (data = {}, { dispatch, rejectWithValue }) => {
  try {
    const response = await organisationsServices.uploadImage(data.data, data.options);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const updateImage = createAsyncThunk(
  'organisations/updateImage', async (data = {}, { dispatch, rejectWithValue }) => {
  try {
    const response = await organisationsServices.updateImage(data.data, data.options);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

const initialState = {
  activeStep: 0,
  organisations: [],
  organisationNames:[],
  organisationPackagesNames:[],
  organisationManagerNames:[],
  organisationDomainNames:[],
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
  isFilter: false,
  filterObject: {},
  organisationImageId:0
};

export const organisationsSlice = createSlice({
  name: 'organisationsSlice',
  initialState,
  reducers: {
    onChangeActiveStep: (state, action) => {
      state.activeStep = action?.payload;
    },
    setOrganisationDetailSearch: (state, action) => {
      state.organisationDetailSearch = action.payload;
    },
    setFilterObject: (state, action) => {
      state.filterObject = action.payload;
    },
    setIsFilter: (state, action) => {
      state.isFilter = action.payload;
    },
    setOrganizationImageId: (state, action) => {
      state.organisationImageId = action.payload;
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
    builder.addCase(getOrganisationNames.fulfilled, (state, action) => {
      state.organisationNames = action?.payload?.data;
    });
    builder.addCase(getOrganisationNames.rejected, (state) => {
      state.organisationNames = [];
    });
    builder.addCase(getOrganisationPackagesNames.fulfilled, (state, action) => {
      state.organisationPackagesNames = action?.payload?.data;
    });
    builder.addCase(getOrganisationPackagesNames.rejected, (state) => {
      state.organisationPackagesNames = [];
    });
    builder.addCase(getOrganisationManagerNames.fulfilled, (state, action) => {
      state.organisationManagerNames = action?.payload?.data;
    });
    builder.addCase(getOrganisationManagerNames.rejected, (state) => {
      state.organisationManagerNames = [];
    });
    builder.addCase(getOrganisationDomainNames.fulfilled, (state, action) => {
      state.organisationDomainNames = action?.payload?.data;
    });
    builder.addCase(getOrganisationDomainNames.rejected, (state) => {
      state.organisationDomainNames = [];
    });
  },
});

export const { onChangeActiveStep, setOrganisationDetailSearch, setFilterObject, setIsFilter ,setOrganizationImageId} = organisationsSlice.actions;