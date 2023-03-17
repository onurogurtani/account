import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import contractsServices from '../../services/contracts.service';
import { getByFilterPagedParamsHelper } from '../../utils/utils';

export const getByFilterPagedDocuments = createAsyncThunk(
    'getByFilterPagedGroups',
    async (data, { getState, dispatch, rejectWithValue }) => {
        try {
            const params = getByFilterPagedParamsHelper(data, 'DocumentDetailSearch.');
            const response = await contractsServices.getByFilterPagedDocuments(params);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const getFilteredContractTypes = createAsyncThunk(
    'getFilteredContractTypes',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await contractsServices.getFilteredContractTypes(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const getByFilterPagedContractKinds = createAsyncThunk(
    'getByFilterPagedContractKinds',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await contractsServices.getByFilterPagedContractKinds(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const addNewContract = createAsyncThunk('addNewContract', async (data, { dispatch, rejectWithValue }) => {
    try {
        const response = await contractsServices.addNewContract(data);
        return response;
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});
export const updateContract = createAsyncThunk('updateContract', async (data, { dispatch, rejectWithValue }) => {
    try {
        const response = await contractsServices.updateContract(data);
        return response;
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});

export const getVersionForContract = createAsyncThunk(
    'getVersionForContract',
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const response = await contractsServices.getVersionForContract(id);
            const data = response;
            console.log('response get', data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const getVersionForCopiedContract = createAsyncThunk(
    'getVersionForCopiedContract',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await contractsServices.getVersionForCopiedContract(data);
            const data = response.data.data;
            console.log('response kopy', data);

            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

const initialState = {
    contractTypes: [],
    contractKinds: [],
    allDocuments: [],
    pagedProperty: {},
};

export const contractsSlice = createSlice({
    name: 'contractsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFilteredContractTypes.fulfilled, (state, action) => {
            state.contractTypes = action?.payload?.data?.items;
        });
        builder.addCase(getFilteredContractTypes.rejected, (state, action) => {
            state.contractTypes = [];
        });
        builder.addCase(getByFilterPagedContractKinds.fulfilled, (state, action) => {
            state.contractKinds = action?.payload?.data?.items;
        });
        builder.addCase(getByFilterPagedContractKinds.rejected, (state, action) => {
            state.contractKinds = [];
        });
        builder.addCase(getByFilterPagedDocuments.fulfilled, (state, action) => {
            state.allDocuments = action?.payload?.data?.items;
            state.pagedProperty = action?.payload?.data?.pagedProperty;
        });
        builder.addCase(getByFilterPagedDocuments.rejected, (state, action) => {
            state.allDocuments = [];
            state.pagedProperty = {};
        });
    },
});
