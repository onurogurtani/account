import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import lessonsServices from '../../services/lessons.services';
import { saveAs } from 'file-saver';
import { resetLessonUnits } from './lessonUnitsSlice';
import { resetLessonSubjects } from './lessonSubjectsSlice';
import { resetLessonSubSubjects } from './lessonSubSubjectsSlice';

export const getLessons = createAsyncThunk('getLessons', async (body, { dispatch, getState, rejectWithValue }) => {
    try {
        return await lessonsServices.getLessons(body);
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});
export const getLessonsQuesiton = createAsyncThunk(
    'getLessonsQuesiton',
    async (body, { dispatch, getState, rejectWithValue }) => {
        try {
            return await lessonsServices.getLessons(body);
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const getLessonsQuesitonFilter = createAsyncThunk(
    'getLessonsQuesitonFilter',
    async (body, { dispatch, getState, rejectWithValue }) => {
        try {
            return await lessonsServices.getLessons(body);
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const getByClassromIdLessons = createAsyncThunk(
    'getByClassromIdLessons',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await lessonsServices.getByClassromIdLessons(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const getByClassromIdLessonsBySearchText = createAsyncThunk(
    'getByClassromIdLessonsBySearchText',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await lessonsServices.getByClassromIdLessonsBySearchText(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const addLessons = createAsyncThunk('addLessons', async (data, { dispatch, rejectWithValue }) => {
    try {
        const response = await lessonsServices.addLessons(data);
        return response;
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});
export const editLessons = createAsyncThunk('editLessons', async (data, { dispatch, rejectWithValue }) => {
    try {
        const response = await lessonsServices.editLessons(data);
        return response;
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});

export const downloadLessonsExcel = createAsyncThunk(
    'downloadLessonsExcel',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await lessonsServices.downloadLessonsExcel();
            saveAs(response, `Ders Tanımlama Dosya Deseni ${Date.now()}.xlsx`);
            // return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const uploadLessonsExcel = createAsyncThunk(
    'uploadLessonsExcel',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await lessonsServices.uploadLessonsExcel(data);
            dispatch(resetLessonUnits());
            dispatch(resetLessonSubjects());
            dispatch(resetLessonSubSubjects());
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const setLessonStatus = createAsyncThunk(
    'setLessonStatus',
    async (body, { dispatch, getState, rejectWithValue }) => {
        try {
            return await lessonsServices.setLessonStatus(body);
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
const initialState = {
    lessons: [],
    lessonsFilterList: [],
    lessonsGetByClassroom: [],
};

export const lessonsSlice = createSlice({
    name: 'lessonsSlice',
    initialState,
    reducers: {
        resetLessonsFilterList: (state, action) => {
            state.lessonsFilterList = [];
        },
        setLessons: (state, action) => {
            state.lessons = action.payload;
        },
        setStatusLessons: (state, action) => {
            state.lessons = state.lessons.map((item) =>
                item.id === action.payload ? { ...item, isActive: !item.isActive } : item,
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getLessons.fulfilled, (state, action) => {
            const { value } = action?.meta?.arg?.[0];
            if (action?.payload?.data?.items.length) {
                state.lessons = state.lessons
                    .filter((u) => u.classroomId !== value)
                    .concat(action?.payload?.data?.items)
                    .sort((a, b) => a.name.localeCompare(b.name));
            }
        });
        builder.addCase(getLessonsQuesiton.fulfilled, (state, action) => {
            state.lessons = action?.payload?.data?.items;
        });
        builder.addCase(getLessonsQuesitonFilter.fulfilled, (state, action) => {
            state.lessonsFilterList = action?.payload?.data?.items;
        });
        builder.addCase(getByClassromIdLessons.fulfilled, (state, action) => {
            state.lessonsGetByClassroom = action?.payload?.data;
        });
        builder.addCase(getByClassromIdLessonsBySearchText.fulfilled, (state, action) => {
            state.lessonsGetByClassroom = action?.payload?.data;
        });
        builder.addCase(uploadLessonsExcel.fulfilled, (state, action) => {
            const { arg } = action.meta;
            state.lessons = state.lessons.filter((item) => item.classroomId !== Number(arg.get('ClassroomId')));
        });
        builder.addCase(addLessons.fulfilled, (state, action) => {
            state.lessons = [action?.payload?.data, ...state.lessons];
        });
        builder.addCase(editLessons.fulfilled, (state, action) => {
            const {
                arg: {
                    entity: { id },
                },
            } = action.meta;
            if (id) {
                state.lessons = [action?.payload?.data, ...state.lessons.filter((item) => item.id !== id)];
            }
        });
    },
});
export const { resetLessonsFilterList, setLessons, setStatusLessons } = lessonsSlice.actions;
