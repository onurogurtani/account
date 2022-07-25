import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import operationClaimsServices from '../../services/operationClaims.services';

export const getOperationClaimsList = createAsyncThunk(
    'getOperationClaimsList',
    async (body, { rejectWithValue }) => {
        try {
            return await operationClaimsServices.getOperationClaimsList();
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const addOperationClaims = createAsyncThunk(
    'addOperationClaims',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await operationClaimsServices.addOperationClaims(data);
            dispatch(getOperationClaimsList());
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    }
);

export const deleteOperationClaims = createAsyncThunk(
    'deleteOperationClaims',
    async ({id}, { rejectWithValue }) => {
        try {
            const response = await operationClaimsServices.deleteOperationClaims({id});
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    }
);

export const updateOperationClaims = createAsyncThunk(
    'updateOperationClaims',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await operationClaimsServices.updateOperationClaims(data);
            dispatch(getOperationClaimsList());
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    }
);

const initialState = {
    operationClaimsList: [],
    draftedTableProperty: {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: 0,
    },
}

export const operationClaimsSlice = createSlice({
    name: "operationClaims",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getOperationClaimsList.fulfilled, (state, action) => {
            state.operationClaimsList = action?.payload?.data?.items
            state.draftedTableProperty = {
                currentPage: 1,
                page: 1,
                pageSize: 10,
                totalCount: action?.payload?.data?.items?.length,
            };
        });
        builder.addCase(getOperationClaimsList.rejected, (state, action) => {
            state.operationClaimsList = [];
            state.draftedTableProperty = {
                currentPage: 1,
                page: 1,
                pageSize: 10,
                totalCount: 0,
            };
        });
    }
})