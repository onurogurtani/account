import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import organisationTypesServices from '../../services/organisationTypes.services';

export const getOrganisationTypes = createAsyncThunk(
    'getOrganisationTypes',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await organisationTypesServices.getOrganisationTypes(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const addOrganisationTypes = createAsyncThunk(
    'addOrganisationTypes',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await organisationTypesServices.addOrganisationTypes(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const updateOrganisationTypes = createAsyncThunk(
    'updateOrganisationTypes',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await organisationTypesServices.updateOrganisationTypes(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

const initialState = {
    organisationTypes: [],
    selectedOrganisationTypeId: null,
    isOpenModal: false,
    sortedInfo: {},
};

export const organisationTypesSlice = createSlice({
    name: 'organisationTypesSlice',
    initialState,
    reducers: {
        selectOrganisationType(state, action) {
            const _id = action.payload;
            state.isOpenModal = true;
            state.selectedOrganisationTypeId = _id;
        },
        openModal(state) {
            state.isOpenModal = true;
        },
        closeModal(state) {
            state.isOpenModal = false;
            state.selectedOrganisationTypeId = null;
        },
        setOrganisationTypes(state, action) {
            state.organisationTypes = action.payload;
        },
        setSortedInfo(state, action) {
            state.sortedInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getOrganisationTypes.fulfilled, (state, action) => {
            state.organisationTypes = action?.payload?.data?.items.sort((a, b) => b.id - a.id);
        });
    },
});
// Actions
export const { openModal, closeModal, selectOrganisationType, setOrganisationTypes, setSortedInfo } =
    organisationTypesSlice.actions;
