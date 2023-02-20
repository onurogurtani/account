import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import asEvServices from '../../services/asEv.service';
import { getByFilterPagedParamsHelper } from '../../utils/utils';

export const getVideoNames = createAsyncThunk('getVideoNames', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await asEvServices.getVideoNames();
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const getCreatedNames = createAsyncThunk('getCreatedNames', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await asEvServices.getCreatedNames();
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const adAsEv = createAsyncThunk('adAsEv', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await asEvServices.adAsEv(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const getFilterPagedAsEvs = createAsyncThunk(
  'getFilterPagedAsEvs',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const params = getByFilterPagedParamsHelper(data, 'AsEvsDetailSearch.');
      const response = await asEvServices.getFilterPagedAsEvs(params);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const deleteAsEv = createAsyncThunk('getFilterPagedAsEvs', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await asEvServices.deleteAsEv(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

const initialState = {
  videoNames: [],
  inserterNames: [],
  //TODO BURAYA İHTİYAÇ OLMAYABİLİR
  newAsEv: {},
  asEvList: [],
  pagedProperty: {},
  asEvQuestions: [],
};

export const asEvSlice = createSlice({
  name: 'asEvs',
  initialState,
  reducers: {
    //todo burada benzeri bir state güncellemesi fonk yazabilirim
    // setFilterObject: (state, action) => {
    //   state.filterObject = action.payload;
    // },
  },
  getVideoNames,
  getCreatedNames,
  extraReducers: (builder) => {
    builder.addCase(getVideoNames.fulfilled, (state, action) => {
      state.videoNames = action?.payload?.data || {};
    });
    builder.addCase(getCreatedNames.fulfilled, (state, action) => {
      state.inserterNames = action?.payload?.data || {};
    });
    builder.addCase(getVideoNames.rejected, (state, action) => {
      state.videoNames = [];
    });
    builder.addCase(getCreatedNames.rejected, (state, action) => {
      state.inserterNames = [];
    });
    builder.addCase(adAsEv.fulfilled, (state, action) => {
      //TODO BURAYI DÜZELT
      state.newAsEv = action?.payload?.data || {};
      state.asEvQuestions = action?.payload?.data?.asEvQuestionOfExams || [];
    });
    builder.addCase(adAsEv.rejected, (state, action) => {
      state.newAsEv = [];
    });
    builder.addCase(getFilterPagedAsEvs.fulfilled, (state, action) => {
      state.asEvList = action?.payload?.data?.items;
      state.pagedProperty = action?.payload?.data?.pagedProperty;
    });
    builder.addCase(getFilterPagedAsEvs, (state, action) => {
      state.asEvList = [];
      state.pagedProperty = {};
    });
  },
});
// export const { setFilterObject } = asEvSlice.actions;
