import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import schoolServices from '../../services/schools.services';

export const getAllSchools = createAsyncThunk(
  'getAllSchools',
  async (body, { rejectWithValue }) => {
    try {
      return await schoolServices.getSchools();
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getSchoolById = createAsyncThunk(
  'getSchoolById',
  async ({ id }, { rejectWithValue }) => {
    try {
      return await schoolServices.getSchoolById({ id });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addSchool = createAsyncThunk(
  'addSchool',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await schoolServices.addSchool(data);
      dispatch(getAllSchools());
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const updateSchool = createAsyncThunk(
  'updateSchool',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await schoolServices.updateSchool(data);
      dispatch(getAllSchools());
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const deleteSchool = createAsyncThunk(
  'deleteSchool',
  async ({ id }, { dispatch, rejectWithValue }) => {
    try {
      const response = await schoolServices.deleteSchool({ id });
      dispatch(getAllSchools());
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const loadSchools = createAsyncThunk(
  'loadSchools',
  async (body, { dispatch, rejectWithValue }) => {
    try {
      const data = new FormData();
      data.append('FormFile', body?.FormFile);
      const response = await schoolServices.loadSchools(data);
      dispatch(getAllSchools());
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getInstitutionTypes = createAsyncThunk(
  'getInstitutionTypes',
  async (body, { rejectWithValue }) => {
    try {
      return await schoolServices.getInstitutionTypes();
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const downloadSchoolExcel = createAsyncThunk(
  'downloadSchoolExcel',
  async (body, { rejectWithValue }) => {
    try {
      return await schoolServices.downloadSchoolExcel();
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  schools: [],
  draftedTableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
};

export const schoolSlice = createSlice({
  name: 'school',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllSchools.fulfilled, (state, action) => {
      state.schools = action?.payload?.data?.items;
      state.draftedTableProperty = {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: action?.payload?.data?.items?.length,
      };
    });
    builder.addCase(getAllSchools.rejected, (state, action) => {
      state.schools = [];
      state.draftedTableProperty = {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: 0,
      };
    });
  },
});
