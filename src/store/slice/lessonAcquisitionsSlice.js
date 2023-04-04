import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import lessonAcquisitionsServices from '../../services/lessonAcquisitions.services';

const initialState = {
    lessonAcquisitions: [],
};

export const lessonAcquisitionsSlice = createSlice({
    name: 'lessonAcquisitionsSlice',
    initialState,
    reducers: {
        resetLessonAcquisitions: (state, action) => {
            state.lessonAcquisitions = [];
        },
        setStatusLessonAcquisitions: (state, action) => {
            state.lessonAcquisitions = state.lessonAcquisitions.map((item) =>
                item.id === action.payload.data ? { ...item, isActive: action.payload.status } : item,
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getLessonAcquisitions.fulfilled, (state, action) => {
            const { value } = action?.meta?.arg?.[0];

            state.lessonAcquisitions = state.lessonAcquisitions
                .filter((u) => u.lessonSubjectId !== value)
                .concat(action?.payload?.data?.items)
                .sort((a, b) => a.name.localeCompare(b.name));
        });
        builder.addCase(addLessonAcquisitions.fulfilled, (state, action) => {
            state.lessonAcquisitions = [action?.payload?.data, ...state.lessonAcquisitions];
        });
        builder.addCase(editLessonAcquisitions.fulfilled, (state, action) => {
            const {
                arg: {
                    entity: { id },
                },
            } = action.meta;
            if (id) {
                state.lessonAcquisitions = [
                    action?.payload?.data,
                    ...state.lessonAcquisitions.filter((item) => item.id !== id),
                ];
            }
        });
    },
});

export const { resetLessonAcquisitions, setStatusLessonAcquisitions } = lessonAcquisitionsSlice.actions;

export const getLessonAcquisitions = createAsyncThunk(
    'getLessonAcquisitions',
    async (body, { dispatch, getState, rejectWithValue }) => {
        try {
            return await lessonAcquisitionsServices.getLessonAcquisitions(body);
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const addLessonAcquisitions = createAsyncThunk(
    'addLessonAcquisitions',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await lessonAcquisitionsServices.addLessonAcquisitions(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const editLessonAcquisitions = createAsyncThunk(
    'editLessonAcquisitions',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await lessonAcquisitionsServices.editLessonAcquisitions(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const setLessonAcquisitionStatus = createAsyncThunk(
    'setLessonAcquisitionStatus',
    async (body, { dispatch, getState, rejectWithValue }) => {
        try {
            return await lessonAcquisitionsServices.setLessonAcquisitionStatus(body);
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
