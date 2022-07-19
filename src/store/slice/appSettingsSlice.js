import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import appSettingsServices from '../../services/appSettings.services';

export const getAppSettings = createAsyncThunk(
  'getAppSettings',
  async ({ code }, { getState, dispatch, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }
      return await appSettingsServices.getAppSettings({ code: code, customerId: customerId });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  appSettings: {},
};

export const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAppSettings.fulfilled, (state, action) => {
      state.appSettings[action?.meta?.arg?.code] = action.payload.message;
    });
  },
});

export const { appSettings } = appSettingsSlice.actions;
