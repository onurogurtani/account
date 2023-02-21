import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import lessonsServices from '../../services/lessons.services';
import { saveAs } from 'file-saver';
import { resetLessonUnits } from './lessonUnitsSlice';
import { resetLessonSubjects } from './lessonSubjectsSlice';
import { resetLessonSubSubjects } from './lessonSubSubjectsSlice';

export const getLessons = createAsyncThunk('getLessons', async (body, { dispatch, getState, rejectWithValue }) => {
    try {
        //statede varsa request iptal
        const findLessons = getState()?.lessons.lessons.find((i) => i.classroomId === body[0]?.value);
        if (findLessons) return rejectWithValue();

        return await lessonsServices.getLessons(body);
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});
export const getLessonsQuesiton = createAsyncThunk(
    'getLessonsQuesiton',
    async (body, { dispatch, getState, rejectWithValue }) => {
        try {
            //statede varsa request iptal
            //  const findLessons = getState()?.lessons.lessons.find((i) => i.classroomId === body[0]?.value);
            //  if (findLessons) return rejectWithValue();

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

export const deleteLessons = createAsyncThunk('deleteLessons', async (data, { dispatch, rejectWithValue }) => {
    try {
        const response = await lessonsServices.deleteLessons(data);
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
    },
    extraReducers: (builder) => {
        builder.addCase(getLessons.fulfilled, (state, action) => {
            if (action?.payload?.data?.items.length) {
                state.lessons = state.lessons.concat(action?.payload?.data?.items).reverse();
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
        builder.addCase(uploadLessonsExcel.fulfilled, (state, action) => {
            const { arg } = action.meta;
            state.lessons = state.lessons.filter((item) => item.classroomId !== Number(arg.get('ClassroomId')));
        });
        builder.addCase(addLessons.fulfilled, (state, action) => {
            state.lessons = state.lessons.concat(action?.payload?.data);
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
        builder.addCase(deleteLessons.fulfilled, (state, action) => {
            const { arg } = action.meta;
            if (arg) {
                state.lessons = state.lessons.filter((item) => item.id !== arg);
            }
        });
    },
});
export const { resetLessonsFilterList, setLessons } = lessonsSlice.actions;
