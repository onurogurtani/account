import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import videoReportsConnected from '../../services/videoReportsConnected.services';

export const videoReportsConnectedGetList = createAsyncThunk(
    'videoReportsConnectedGetList',
    async (body, { dispatch, rejectWithValue }) => {
        try {
            const response = await videoReportsConnected.getFilter(body);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const videoReportsConnectedDownload = createAsyncThunk(
    'videoReportsConnectedDownload',
    async (body, { dispatch, rejectWithValue }) => {
        try {
            const response = await videoReportsConnected.getFilterDownload(body);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

const initialState = {
    videoReportsConnectedList: [],
};

export const videoReportsConnectedSlice = createSlice({
    name: 'videoReportsConnectedSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(videoReportsConnectedGetList.fulfilled, (state, action) => {
            state.videoReportsConnectedList = action?.payload?.data;
        });
        builder.addCase(videoReportsConnectedDownload.fulfilled, (state, action) => {
            const element = document.createElement('a');
            const blob = new Blob([action.payload], { type: action.payload.type });
            element.href = window.URL.createObjectURL(blob);
            element.download = 'reports';
            document.body.appendChild(element);
            element.click();
            element.remove();
        });
        builder.addCase(videoReportsConnectedGetList.rejected, (state) => {
            state.videoReportsConnectedList = [];
        });
    },
});
