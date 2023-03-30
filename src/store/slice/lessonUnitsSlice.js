import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import lessonUnitsServices from '../../services/lessonUnits.services.js';

const initialState = {
    lessonUnits: [],
    lessonUnitsFilter: [],
};

export const lessonUnitsSlice = createSlice({
    name: 'lessonUnitsSlice',
    initialState,
    reducers: {
        resetLessonUnits: (state, action) => {
            state.lessonUnits = [];
        },
        resetLessonUnitsFilter: (state, action) => {
            state.lessonUnitsFilter = [];
        },
        setStatusUnits: (state, action) => {
            state.lessonUnits = state.lessonUnits.map((item) =>
                item.id === action.payload.data ? { ...item, isActive: action.payload.status } : item,
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUnits.fulfilled, (state, action) => {
            const { value } = action?.meta?.arg?.[0];
            if (action?.payload?.data?.items.length) {
                state.lessonUnits = state.lessonUnits
                    .filter((u) => u.lessonId !== value)
                    .concat(action?.payload?.data?.items)
                    .sort((a, b) => a.name.localeCompare(b.name));
            }
        });
        builder.addCase(addUnits.fulfilled, (state, action) => {
            state.lessonUnits = [action?.payload?.data, ...state.lessonUnits];
        });
        builder.addCase(editUnits.fulfilled, (state, action) => {
            const {
                arg: {
                    entity: { id },
                },
            } = action.meta;
            if (id) {
                state.lessonUnits = [action?.payload?.data, ...state.lessonUnits.filter((item) => item.id !== id)];
            }
        });

        builder.addCase(getUnitsList.fulfilled, (state, action) => {
            state.lessonUnits = action?.payload?.data?.items;
        });
        builder.addCase(getUnitsListFilter.fulfilled, (state, action) => {
            state.lessonUnitsFilter = action?.payload?.data?.items;
        });
    },
});

export const { resetLessonUnits, resetLessonUnitsFilter, setStatusUnits } = lessonUnitsSlice.actions;

export const getUnits = createAsyncThunk('getUnits', async (body, { dispatch, getState, rejectWithValue }) => {
    try {
        return await lessonUnitsServices.getUnits(body);
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});
export const getUnitsList = createAsyncThunk('getUnitsList', async (body, { dispatch, getState, rejectWithValue }) => {
    try {
        return await lessonUnitsServices.getUnits(body);
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});
export const getUnitsListFilter = createAsyncThunk(
    'getUnitsListFilter',
    async (body, { dispatch, getState, rejectWithValue }) => {
        try {
            return await lessonUnitsServices.getUnits(body);
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const addUnits = createAsyncThunk('addUnits', async (data, { dispatch, rejectWithValue }) => {
    try {
        const response = await lessonUnitsServices.addUnits(data);
        return response;
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});

export const editUnits = createAsyncThunk('editUnits', async (data, { dispatch, rejectWithValue }) => {
    try {
        const response = await lessonUnitsServices.editUnits(data);
        return response;
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});

export const setUnitStatus = createAsyncThunk(
    'setUnitStatus',
    async (body, { dispatch, getState, rejectWithValue }) => {
        try {
            return await lessonUnitsServices.setUnitStatus(body);
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
