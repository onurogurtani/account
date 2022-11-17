import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import profileServices from '../../services/profile.services';

export const getCurrentUser = createAsyncThunk(
  'getCurrentUser',
  async (body, { dispatch, rejectWithValue }) => {
    try {
      const response = await profileServices.getCurrentUser();
      if (response?.data?.userCode) {
        rejectWithValue({ message: '' });
      }
      const body = { userCode: response?.data?.userCode };
      //await dispatch(userCustomersGetList(body));
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const currentUserUpdate = createAsyncThunk(
  'currentUserUpdate',
  async (body, { dispatch, rejectWithValue }) => {
    try {
      const response = await profileServices.currentUserUpdate({ entity: { ...body } });

      await dispatch(getCurrentUser());
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  currentUser: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action?.payload?.data;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.currentUser = {};
    });
  },
});
