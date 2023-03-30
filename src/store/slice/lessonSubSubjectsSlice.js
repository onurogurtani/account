import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import lessonSubSubjectsServices from '../../services/lessonSubSubjects.services';

const initialState = {
    lessonSubSubjects: [],
    lessonSubSubjectsFilter: [],
};

export const lessonSubSubjectsSlice = createSlice({
    name: 'lessonSubSubjectsSlice',
    initialState,
    reducers: {
        resetLessonSubSubjects: (state, action) => {
            state.lessonSubSubjects = [];
        },
        resetLessonSubSubjectsFilter: (state, action) => {
            state.lessonSubSubjectsFilter = [];
        },
        setStatusLessonSubSubjects: (state, action) => {
            state.lessonSubSubjects = state.lessonSubSubjects.map((item) =>
                action.payload.data.includes(item.id) ? { ...item, isActive: action.payload.status } : item,
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getLessonSubSubjects.fulfilled, (state, action) => {
            // if (action?.payload?.data?.items.length) {
            //   state.lessonSubSubjects = state.lessonSubSubjects.concat(action?.payload?.data?.items);
            // }
            const { value } = action?.meta?.arg?.[0];
            state.lessonSubSubjects = state.lessonSubSubjects
                .filter((u) => u.lessonSubjectId !== value)
                .concat(action?.payload?.data?.items)
                .sort((a, b) => a.name.localeCompare(b.name));
        });
        builder.addCase(addLessonSubSubjects.fulfilled, (state, action) => {
            state.lessonSubSubjects = [action?.payload?.data, ...state.lessonSubSubjects];
        });
        builder.addCase(getLessonSubSubjectsList.fulfilled, (state, action) => {
            state.lessonSubSubjects = action?.payload?.data?.items;
        });
        builder.addCase(getLessonSubSubjectsListFilter.fulfilled, (state, action) => {
            state.lessonSubSubjectsFilter = action?.payload?.data?.items;
        });
        builder.addCase(editLessonSubSubjects.fulfilled, (state, action) => {
            const {
                arg: {
                    entity: { id },
                },
            } = action.meta;
            if (id) {
                state.lessonSubSubjects = [
                    action?.payload?.data,
                    ...state.lessonSubSubjects.filter((item) => item.id !== id),
                ];
            }
        });
    },
});

export const { resetLessonSubSubjects, resetLessonSubSubjectsFilter, setStatusLessonSubSubjects } =
    lessonSubSubjectsSlice.actions;
export const getLessonSubSubjects = createAsyncThunk(
    'getLessonSubSubjects',
    async (body, { dispatch, getState, rejectWithValue }) => {
        try {
            return await lessonSubSubjectsServices.getLessonSubSubjects(body);
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const getLessonSubSubjectsList = createAsyncThunk(
    'getLessonSubSubjectsList',
    async (body, { dispatch, getState, rejectWithValue }) => {
        try {
            return await lessonSubSubjectsServices.getLessonSubSubjects(body);
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const getLessonSubSubjectsListFilter = createAsyncThunk(
    'getLessonSubSubjectsListFilter',
    async (body, { dispatch, getState, rejectWithValue }) => {
        try {
            return await lessonSubSubjectsServices.getLessonSubSubjects(body);
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const addLessonSubSubjects = createAsyncThunk(
    'addLessonSubSubjects',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await lessonSubSubjectsServices.addLessonSubSubjects(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const editLessonSubSubjects = createAsyncThunk(
    'editLessonSubSubjects',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await lessonSubSubjectsServices.editLessonSubSubjects(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
