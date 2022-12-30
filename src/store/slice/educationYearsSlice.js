import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import educationYearsServices from '../../services/EducationYears.services';
export const getEducationYearList = createAsyncThunk(
  'getEducationYearList',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await educationYearsServices.getEducationYearList(null, data?.params);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const getEducationYearAdd = createAsyncThunk(
  'getEducationYearAdd',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await educationYearsServices.getEducationYearAdd(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const getEducationYearUpdate = createAsyncThunk(
  'getEducationYearUpdate',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await educationYearsServices.getEducationYearUpdate(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const getEducationYearDelete = createAsyncThunk(
  'getEducationYearDelete',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await educationYearsServices.getEducationYearDelete(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
const initialState = {
  educationYearList: [],
  selectedEducationYearId: null,
  isOpenModal: false,
};

export const educationYearsSlice = createSlice({
  name: 'educationYearsSlice',
  initialState,
  reducers: {
    selectEducationYear(state, action) {
      const _id = action.payload;
      state.isOpenModal = true;
      state.selectedEducationYearId = _id;
    },
    openModal(state) {
      state.isOpenModal = true;
    },
    closeModal(state) {
      state.isOpenModal = false;
      state.selectedEducationYearId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEducationYearList.fulfilled, (state, action) => {
      state.educationYearList = action.payload.data;
    });
    builder.addCase(getEducationYearAdd.fulfilled, (state, action) => {
      state.educationYearList.items = [action?.payload?.data].concat(state.educationYearList.items);
      state.educationYearList.pagedProperty.totalCount += 1;
    });
    builder.addCase(getEducationYearUpdate.fulfilled, (state, action) => {
      const {
        arg: {
          educationYear: { id },
        },
      } = action.meta;
      if (id) {
        state.educationYearList.items = [
          ...state.educationYearList.items.map((item) => (item.id === id ? action?.payload?.data : item)),
        ];
      }
    });
  },
});
// Actions
export const { openModal, closeModal, selectEducationYear } = educationYearsSlice.actions;
