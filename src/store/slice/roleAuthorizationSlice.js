import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import operationClaimsServices from '../../services/operationClaims.services';
import organisationsServices from '../../services/organisations.services';
import { groupBy } from '../../utils/utils';

export const getByFilterPagedRoleAuthorization = createAsyncThunk(
    'roleAuthorization/getByFilterPagedRoleAuthorization',
    async (data = {}, { getState, dispatch, rejectWithValue }) => {
        try {
            const response = await organisationsServices.getByFilterPagedOrganisations({
                organisationDetailSearch: { ...data, ...data?.body, body: undefined },
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
    async (body, { rejectWithValue }) => {
        try {
            return await operationClaimsServices.getOperationClaimsList();
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

const initialState = {
    roles: [],
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
        builder.addCase(getByFilterPagedRoleAuthorization.fulfilled, (state, action) => {
            state.roles = action?.payload?.data?.items;
            state.tableProperty = action?.payload?.data?.pagedProperty;
        });
        builder.addCase(getByFilterPagedRoleAuthorization.rejected, (state) => {
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
    },
});

export const { setRoleAuthorizationDetailSearch } = roleAuthorizationSlice.actions;
