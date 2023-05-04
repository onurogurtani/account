import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import lessonBracketsServices from '../../services/lessonBrackets.services';

const initialState = {
    lessonBrackets: [],
};

export const lessonBracketsSlice = createSlice({
    name: 'lessonBracketsSlice',
    initialState,
    reducers: {
        resetLessonBrackets: (state, action) => {
            state.lessonBrackets = [];
        },
        setStatusLessonBrackets: (state, action) => {
            state.lessonBrackets = state.lessonBrackets.map((item) => {
                if ((Array.isArray(action.payload.data) && action.payload.data.includes(item.id)) || item.id === action.payload.data) {
                    return { ...item, isActive: action.payload.status }
                }
                return item
            }

            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getLessonBrackets.fulfilled, (state, action) => {
            const { value } = action?.meta?.arg?.[0];
            state.lessonBrackets = state.lessonBrackets
                .filter((u) => u.lessonAcquisitionId !== value)
                .concat(action?.payload?.data?.items)
                .sort((a, b) => a.name.localeCompare(b.name));
        });
        builder.addCase(addLessonBrackets.fulfilled, (state, action) => {
            state.lessonBrackets = [action?.payload?.data, ...state.lessonBrackets];
        });

        builder.addCase(editLessonBrackets.fulfilled, (state, action) => {
            const {
                arg: {
                    entity: { id },
                },
            } = action.meta;
            if (id) {
                state.lessonBrackets = [
                    action?.payload?.data,
                    ...state.lessonBrackets.filter((item) => item.id !== id),
                ];
            }
        });
    },
});

export const { resetLessonBrackets, setStatusLessonBrackets } = lessonBracketsSlice.actions;

export const getLessonBrackets = createAsyncThunk(
    'getLessonBrackets',
    async (body, { dispatch, getState, rejectWithValue }) => {
        try {
            return await lessonBracketsServices.getLessonBrackets(body);
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const addLessonBrackets = createAsyncThunk('addLessonBrackets', async (data, { dispatch, rejectWithValue }) => {
    try {
        const response = await lessonBracketsServices.addLessonBrackets(data);
        return response;
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});

export const editLessonBrackets = createAsyncThunk(
    'editLessonBrackets',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await lessonBracketsServices.editLessonBrackets(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const setLessonBracketStatus = createAsyncThunk(
    'setLessonAcquisitionStatus',
    async (body, { dispatch, getState, rejectWithValue }) => {
        try {
            return await lessonBracketsServices.setLessonBracketStatus(body);
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
