import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import participantGroupsServices from '../../services/participantGroups.services';

export const getParticipantGroupsPagedList = createAsyncThunk(
  'getParticipantGroupsPagedList',
  async ({ params, data } = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await participantGroupsServices.getParticipantGroupsPagedList(params);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const getAllPackages = createAsyncThunk(
  'getAllPackages',
  async ({ params, data } = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await participantGroupsServices.getAllPackages();
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const createParticipantGroups = createAsyncThunk(
  'createParticipantGroups',
  async (data = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await participantGroupsServices.createParticipantGroups(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const updateParticipantGroups = createAsyncThunk(
  'updateParticipantGroups',
  async (data = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await  participantGroupsServices.updateParticipantGroups(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const deleteParticipantGroups = createAsyncThunk(
    'deleteParticipantGroups',
    async (data = {}, { dispatch, rejectWithValue }) => {
      try {
        const response = await participantGroupsServices.deleteParticipantGroups(data);
        return response;
      } catch (error) {
        return rejectWithValue(error?.data);
      }
    },
  );

const initialState = {
  participantsGroupList: [],
  packages: []
};

export const participantGroupsSlice = createSlice({
  name: 'participantGroups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getParticipantGroupsPagedList.fulfilled, (state, action) => {
      state.participantsGroupList = action?.payload?.data;
    });
    builder.addCase(getAllPackages.fulfilled, (state, action) => {
      state.packages = action?.payload?.data?.items;
    });
  },
});
