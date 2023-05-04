import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import examTypeServices from '../../services/examType.services';

export const getExamType = createAsyncThunk('getExamType', async (data, { dispatch, rejectWithValue }) => {
    try {
        const response = await examTypeServices.getExamType();
        console.log(response);
        return response;
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});

export const getByFilterPagedMaxNetCounts = createAsyncThunk(
    'getByFilterPagedMaxNetCounts',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await examTypeServices.getByFilterPagedMaxNetCounts();
            console.log(response);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

const initialState = {
    allExamTypes: [],
    filterExamType:[],

};

export const examTypesSlice = createSlice({
    name: 'examTypesSlice',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(getExamType.fulfilled, (state, action) => {
            state.allExamTypes = action?.payload?.data;
        });

        builder.addCase(getByFilterPagedMaxNetCounts.fulfilled, (state, action) => {
            state.filterExamType = action?.payload?.data;
        });
    },
   
});
