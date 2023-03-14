import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import videoReportsNotConnected from '../../services/videoReportsNotConnected.services';

export const videoReportsNotConnectedGetList = createAsyncThunk(
    'videoReportsNotConnectedGetList',
    async (body, { dispatch, rejectWithValue }) => {
        try {
            const response = await videoReportsNotConnected.getFilter(body);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const videoReportsNotConnectedDownload = createAsyncThunk(
    'videoReportsNotConnectedDownload',
    async (body, { dispatch, rejectWithValue }) => {
        try {
            const response = await videoReportsNotConnected.getFilterDownload(body);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

const initialState = {
    videoReportsNotConnectedList: [],
};

export const videoReportsNotConnectedSlice = createSlice({
    name: 'videoReportsNotConnectedSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(videoReportsNotConnectedGetList.fulfilled, (state, action) => {
            state.videoReportsNotConnectedList = action?.payload?.data;
        });
        builder.addCase(videoReportsNotConnectedDownload.fulfilled, (state, action) => {
            const element = document.createElement('a');
            const blob = new Blob([action.payload], { type: action.payload.type });
            element.href = window.URL.createObjectURL(blob);
            element.download = 'reports';
            document.body.appendChild(element);
            element.click();
            element.remove();
        });
        builder.addCase(videoReportsNotConnectedGetList.rejected, (state) => {
            state.videoReportsNotConnectedList = [];
        });
    },
});
