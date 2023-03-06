import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const getGroupsList = createAsyncThunk('getGroupsList', async (body, { rejectWithValue }) => {
    try {
        return await groupsServices.getGroupsList();
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});

const initialState = {
    allGroupList: [],
    groupsList: [],
    groupClaims: [],
    selectedRole: null,
    isFilter: false,
    filterObject: {},
    tableProperty: {
        currentPage: 1,
        page: 1,
        pageSize: 0,
        totalCount: 0,
    },
};

export const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        selectedGroup: (state, action) => {
            state.selectedRole = action.payload;
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
            state.allGroupList = action?.payload?.data;
        });
        builder.addCase(getGroupsList.rejected, (state, action) => {
            state.allGroupList = [];
        });
    },
});

export const { selectedGroup, setFilterObject, setIsFilter } = groupsSlice.actions;
