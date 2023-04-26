import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import sectionDescriptionsServices from '../../services/sectionDescriptions.service';

export const getSectionDescriptions = createAsyncThunk(
    'getSectionDescriptions',
    async (body, { dispatch, rejectWithValue }) => {
        try {
            const response = await sectionDescriptionsServices.getSectionDescriptions();
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const addSectionDescriptions = createAsyncThunk(
    'addSectionDescriptions',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await sectionDescriptionsServices.addSectionDescriptions(data);
            dispatch(getSectionDescriptions());
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const updateSectionDescriptions = createAsyncThunk(
    'updateSectionDescriptions',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await sectionDescriptionsServices.updateSectionDescriptions(data);
            dispatch(getSectionDescriptions());
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const copySectionDescriptions = createAsyncThunk(
    'copySectionDescriptions',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await sectionDescriptionsServices.copySectionDescriptions(data);
            dispatch(getSectionDescriptions());
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

const initialState = {
    sectionDescriptions: [],
};

export const sectionDescriptionsSlice = createSlice({
    name: 'sectionDescriptions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSectionDescriptions.fulfilled, (state, action) => {
            state.sectionDescriptions = action?.payload?.data;
        });
        builder.addCase(getSectionDescriptions.rejected, (state, action) => {
            state.sectionDescriptions = [];
        });
    },
});
