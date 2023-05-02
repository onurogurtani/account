import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import yokSyncVersionService from '../../services/yokSyncVersion.service';

export const getVersionList = createAsyncThunk(
    'getVersionList',
    async (data, { getState, dispatch, rejectWithValue }) => {
        try {
            const response = await yokSyncVersionService.getVersionList();
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const getLgsDataChanges = createAsyncThunk('getLgsDataChanges', async (data, { dispatch, rejectWithValue }) => {
    try {
        const response = await yokSyncVersionService.getLgsDataChanges(data);
        return response;
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});
export const getYksAscDataChanges = createAsyncThunk(
    'getYksAscDataChanges',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await yokSyncVersionService.getYksAscDataChanges(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const getYksLicenceDataChanges = createAsyncThunk(
    'getYksLicenceDataChanges',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await yokSyncVersionService.getYksLicenceDataChanges(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const syncYksLicencePrefs = createAsyncThunk(
    'syncYksLicencePrefs',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await yokSyncVersionService.syncYksLicencePrefs();
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const syncYksAscPrefs = createAsyncThunk('syncYksAscPrefs', async (data, { dispatch, rejectWithValue }) => {
    try {
        const response = await yokSyncVersionService.syncYksAscPrefs();
        return response;
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});
export const loadLgsDataChanges = createAsyncThunk(
    'loadLgsDataChanges',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await yokSyncVersionService.loadLgsDataChanges(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

const initialState = {
    versionDiffData: [],
    lgsDataChanges: [],
    yksLicenceDataChanges: [],
    yksAscDataChanges: [],
};

export const yokSyncVersionSlice = createSlice({
    name: 'yokSyncVersionSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVersionList.fulfilled, (state, action) => {
            state.versionDiffData = action?.payload?.data;
        });
        builder.addCase(getVersionList.rejected, (state, action) => {
            state.contractTypes = [];
        });
        builder.addCase(getLgsDataChanges.fulfilled, (state, action) => {
            state.lgsDataChanges = action?.payload?.data;
        });
        builder.addCase(getLgsDataChanges.rejected, (state, action) => {
            state.lgsDataChanges = [];
        });
        builder.addCase(getYksAscDataChanges.fulfilled, (state, action) => {
            state.yksAscDataChanges = action?.payload?.data;
        });
        builder.addCase(getYksAscDataChanges.rejected, (state, action) => {
            state.yksAscDataChanges = [];
        });
        builder.addCase(getYksLicenceDataChanges.fulfilled, (state, action) => {
            state.yksLicenceDataChanges = action?.payload?.data;
        });
        builder.addCase(getYksLicenceDataChanges.rejected, (state, action) => {
            state.yksLicenceDataChanges = [];
        });
    },
});
