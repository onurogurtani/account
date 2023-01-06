import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { roleType } from '../../constants/role';
import groupsServices from '../../services/groups.service';
import { getByFilterPagedParamsHelper } from '../../utils/utils';

export const getByFilterPagedGroups = createAsyncThunk(
    'getByFilterPagedGroups',
    async (data = {}, { getState, dispatch, rejectWithValue }) => {
        try {
            const params = getByFilterPagedParamsHelper(data, 'GroupDetailSearch.');
            const response = await groupsServices.GetByFilterPagedGroups(params);
            dispatch(setFilterObject(data));
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);


export const getGroupsList = createAsyncThunk(
    'getGroupsList',
    async (body, { rejectWithValue }) => {
        try {
            return await groupsServices.getGroupsList();
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const getGroupClaims = createAsyncThunk(
    'getGroupClaims',
    async ({ id }, { rejectWithValue }) => {
        try {
            return await groupsServices.getGroupClaims({ id });
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const addGroup = createAsyncThunk(
    'addGroup',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await groupsServices.addGroup(data);
            dispatch(getGroupsList());
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    }
);

export const deleteGroup = createAsyncThunk(
    'deleteGroup',
    async (data, { rejectWithValue }) => {
        try {
            const response = await groupsServices.deleteGroup(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    }
);

export const updateGroup = createAsyncThunk(
    'updateGroup',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await groupsServices.updateGroup(data);
            dispatch(getGroupsList());
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    }
);

export const addGroupClaims = createAsyncThunk(
    'addGroupClaims',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await groupsServices.addGroupClaims(data);
            dispatch(getGroupsList());
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    }
);

export const deleteGroupClaims = createAsyncThunk(
    'deleteGroupClaims',
    async ({ id }, { rejectWithValue }) => {
        try {
            return await groupsServices.deleteGroupClaims({ id });
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

const initialState = {
    groupsList: [],
    groupClaims: [],
    selectedRole: null,
    draftedTableProperty: {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: 0,
    },
    isFilter: false,
    filterObject: {},
    tableProperty: {
        currentPage: 1,
        page: 1,
        pageSize: 0,
        totalCount: 0,
    },
}

export const groupsSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
        selectedGroup: (state, action) => {
            state.selectedRole = action.payload
        },
        setFilterObject: (state, action) => {
            state.filterObject = action.payload;
        },
        setIsFilter: (state, action) => {
            state.isFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getByFilterPagedGroups.fulfilled, (state, action) => {
            state.groupsList = action?.payload?.data?.items || [];
            state.tableProperty = action?.payload?.data?.pagedProperty || {};
        });
        builder.addCase(getByFilterPagedGroups.rejected, (state, action) => {
            state.groupsList = [];
            state.tableProperty = {
                currentPage: 1,
                page: 1,
                pageSize: 10,
                totalCount: 0,
            };
        });
        builder.addCase(getGroupsList.fulfilled, (state, action) => {
            state.groupsList = action?.payload?.data
            state.draftedTableProperty = {
                currentPage: 1,
                page: 1,
                pageSize: 10,
                totalCount: action?.payload?.data?.length,
            };
        });
        builder.addCase(getGroupsList.rejected, (state, action) => {
            state.groupsList = [];
            state.draftedTableProperty = {
                currentPage: 1,
                page: 1,
                pageSize: 10,
                totalCount: 0,
            };
        });
        builder.addCase(getGroupClaims.fulfilled, (state, action) => {
            state.groupClaims = action?.payload?.data
        });
    }
})

export const { selectedGroup, setFilterObject, setIsFilter } = groupsSlice.actions;