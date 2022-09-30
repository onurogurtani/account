import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import citysCountysServices from '../../services/citysCountys.services';

export const getCitys = createAsyncThunk(
    'getCitys',
    async (body, { dispatch, rejectWithValue }) => {
        try {
            return await citysCountysServices.citysGetList();
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const getCountys = createAsyncThunk(
    'getCountys',
    async (body, { dispatch, rejectWithValue }) => {
        try {
            return await citysCountysServices.countysGetList();
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);


const initialState = {
    citys: [],
    countys: [],
};

export const citysCountysSlice = createSlice({
    name: 'citysCountys',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCitys.fulfilled, (state, action) => {
            state.citys = action?.payload?.data?.items;
        });
        builder.addCase(getCitys.rejected, (state) => {
            state.citys = [];
        });
        builder.addCase(getCountys.fulfilled, (state, action) => {
            state.countys = action?.payload?.data?.items;
        });
        builder.addCase(getCountys.rejected, (state) => {
            state.countys = [];
        });
    },
});
