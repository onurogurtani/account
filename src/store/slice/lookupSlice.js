import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import lookupServices from '../../services/lookup.services';

export const cityGetAll = createAsyncThunk('cityGetAll', async (body, { rejectWithValue }) => {
  try {
    return await lookupServices.cityGetList();
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const countyGetAll = createAsyncThunk(
  'countyGetAll',
  async (cityId, { rejectWithValue }) => {
    try {
      return await lookupServices.countyGetList(cityId);
    } catch (error) {
      return rejectWithValue(error.data);
    }
  },
);

export const neighborhoodGetAll = createAsyncThunk(
  'neighborhoodGetAll',
  async (countyId, { rejectWithValue }) => {
    try {
      return await lookupServices.neighborhoodGetList(countyId);
    } catch (error) {
      return rejectWithValue(error.data);
    }
  },
);

const initialState = {
  cityList: [],
  countyList: [],
  neighborhoodList: [],
};

export const lookupSlice = createSlice({
  name: 'lookup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(cityGetAll.fulfilled, (state, action) => {
      state.cityList = action?.payload?.data || [];
    });
    builder.addCase(countyGetAll.fulfilled, (state, action) => {
      state.countyList = action?.payload?.data || [];
    });
    builder.addCase(neighborhoodGetAll.fulfilled, (state, action) => {
      state.neighborhoodList = action?.payload?.data || [];
    });
  },
});
