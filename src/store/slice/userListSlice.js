import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userServices from '../../services/user.service';

export const getUserList = createAsyncThunk(
    'getUserList',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await userServices.userGetList(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    }
);

export const updateUserList = createAsyncThunk(
    'updateUserList',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await userServices.userUpdate(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    }
);

export const addUserList = createAsyncThunk(
    'addUserList',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await userServices.addUser(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    }
);

export const deleteUserList = createAsyncThunk(
    'deleteUserList',
    async ({ id }, { rejectWithValue }) => {
        try {
            return await userServices.deleteUser({ id });
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);


const initialState = {
    usersList: [],
    draftedTableProperty: {
        currentPage: 1,
        page: 1,
        pageSize: 0,
        totalCount: 0,
    },
}

export const userListSlice = createSlice({
    name: "userList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserList.fulfilled, (state, action) => {
            state.usersList = action?.payload?.data?.items || [];
            state.draftedTableProperty = action?.payload?.data?.pagedProperty || {};
        });
        builder.addCase(getUserList.rejected, (state, action) => {
            state.usersList = [];
            state.draftedTableProperty = {
                currentPage: 1,
                page: 1,
                pageSize: 0,
                totalCount: 0,
            };
        });
    }
})
