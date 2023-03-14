import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import appSettingsServices from '../../services/appSettings.service';

export const getJobSettings = createAsyncThunk(
    'jobSettings/getJobSettings',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await appSettingsServices.getJobSettings(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const updateJobSettings = createAsyncThunk(
    'jobSettings/updateJobSettings',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await appSettingsServices.updateAppSettings(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

const initialState = {
    jobs: [],
};

export const jobSettingsSlice = createSlice({
    name: 'jobSettings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getJobSettings.fulfilled, (state, action) => {
            state.jobs = action?.payload?.data;
        });
        builder.addCase(getJobSettings.rejected, (state) => {
            state.jobs = [];
        });
    },
});
