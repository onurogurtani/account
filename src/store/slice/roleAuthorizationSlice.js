import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import operationClaimsServices from '../../services/operationClaims.services';
import rolesServices from '../../services/roles.services';
import { groupBy } from '../../utils/utils';

export const getByFilterPagedRoles = createAsyncThunk(
    'roleAuthorization/getByFilterPagedRoles',
    async (data = {}, { getState, dispatch, rejectWithValue }) => {
        try {
            const response = await rolesServices.getByFilterPagedRoles({
                roleDetailSearch: { ...data, ...data?.body, body: undefined },
            });
            dispatch(setRoleAuthorizationDetailSearch(data));
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const getOperationClaimsList = createAsyncThunk(
    'roleAuthorization/getOperationClaimsList',
    async (body, { rejectWithValue, getState }) => {
        try {
            const operationClaimsLength = Object.keys(getState()?.roleAuthorization.operationClaims).length;
            if (operationClaimsLength) return rejectWithValue();
            return await operationClaimsServices.getOperationClaimsList();
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const addRole = createAsyncThunk('roleAuthorization/addRole', async (body, { rejectWithValue, getState }) => {
    try {
        return await rolesServices.addRole({ role: body });
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const updateRole = createAsyncThunk(
    'roleAuthorization/updateRole',
    async (body, { rejectWithValue, getState }) => {
        try {
            return await rolesServices.updateRole({ role: body });
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const getRoleById = createAsyncThunk(
    'roleAuthorization/getRoleById',
    async (body, { rejectWithValue, getState }) => {
        try {
            return await rolesServices.getRoleById({ Id: body });
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
export const roleCopy = createAsyncThunk('roleAuthorization/roleCopy', async (body, { rejectWithValue, getState }) => {
    try {
        return await rolesServices.roleCopy(body);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getAllRoleList = createAsyncThunk(
    'roleAuthorization/getAllRoleList',
    async (body, { rejectWithValue, getState }) => {
        try {
            return await rolesServices.getAllRoleList(body);
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const passiveCheckControlRole = createAsyncThunk(
    'roleAuthorization/passiveCheckControlRole',
    async (body, { rejectWithValue, getState }) => {
        try {
            return await rolesServices.passiveCheckControlRole(body);
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
export const setPassiveRole = createAsyncThunk(
    'roleAuthorization/setPassiveRole',
    async (body, { rejectWithValue, getState }) => {
        try {
            return await rolesServices.setPassiveRole(body);
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

const initialState = {
    roles: [],
    allRoles: [],
    operationClaims: [],
    roleAuthorizationDetailSearch: {
        pageNumber: 1,
        pageSize: 10,
        body: {},
        orderBy: 'UpdateTimeDESC',
    },
    tableProperty: {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: 0,
    },
};

export const roleAuthorizationSlice = createSlice({
    name: 'roleAuthorizationSlice',
    initialState,
    reducers: {
        setRoleAuthorizationDetailSearch: (state, action) => {
            state.roleAuthorizationDetailSearch = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getByFilterPagedRoles.fulfilled, (state, action) => {
            state.roles = action?.payload?.data?.items;
            state.tableProperty = action?.payload?.data?.pagedProperty;
        });
        builder.addCase(getByFilterPagedRoles.rejected, (state) => {
            state.roles = [];
            state.tableProperty = {
                currentPage: 1,
                page: 1,
                pageSize: 10,
                totalCount: 0,
            };
        });
        builder.addCase(getOperationClaimsList.fulfilled, (state, action) => {
            const list = action?.payload?.data?.items.sort((a, b) => a?.categoryName?.localeCompare(b?.categoryName));
            state.operationClaims = groupBy(list, 'categoryName');
        });
        builder.addCase(getAllRoleList.fulfilled, (state, action) => {
            state.allRoles = action?.payload?.data?.items;
        });
        builder.addCase(passiveCheckControlRole.fulfilled, (state, action) => {
            console.log(1, action);
            const {
                arg: { RoleId },
            } = action.meta;
            const { isPassiveCheck } = action?.payload?.data;
            if (RoleId && isPassiveCheck) {
                state.roles = state.roles.map((item) => (item.id === RoleId ? { ...item, recordStatus: 0 } : item));
            }
        });
        builder.addCase(setPassiveRole.fulfilled, (state, action) => {
            console.log(1, action);
            const {
                arg: { roleId },
            } = action.meta;
            const { success } = action?.payload;
            if (roleId && success) {
                state.roles = state.roles.map((item) => (item.id === roleId ? { ...item, recordStatus: 0 } : item));
            }
        });
    },
});

export const { setRoleAuthorizationDetailSearch } = roleAuthorizationSlice.actions;
