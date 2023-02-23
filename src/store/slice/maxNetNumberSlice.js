import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import maxNetNumberServices from '../../services/maxNetNumbers.services';

export const getMaxNetCounts = createAsyncThunk(
    'getMaxNetCounts',
    async ({ params = {}, data = {} } = {}, { dispatch, rejectWithValue }) => {
        try {
            const response = await maxNetNumberServices.getMaxNetCounts(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const getMaxNetCountsAdd = createAsyncThunk(
    'getMaxNetCounts',
    async ({ params = {}, data = {} } = {}, { dispatch, rejectWithValue }) => {
        try {
            const response = await maxNetNumberServices.getMaxNetCountsAdd(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const getMaxNetCountsUpdate = createAsyncThunk(
    'getMaxNetCounts',
    async ({ params = {}, data = {} } = {}, { dispatch, rejectWithValue }) => {
        try {
            const response = await maxNetNumberServices.getMaxNetCountsUpdate(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

const initialState = {
    maxNetNumberList: {},
};

export const maxNetNumberSlice = createSlice({
    name: 'maxNetNumber',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMaxNetCounts.fulfilled, (state, action) => {
            state.maxNetNumberList = action?.payload?.data;
        });
    },
});
