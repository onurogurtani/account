import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import lessonSubjectsServices from '../../services/lessonSubjects.services';

const initialState = {
  lessonSubjects: [],
};

export const lessonSubjectsSlice = createSlice({
  name: 'lessonSubjectsSlice',
  initialState,
  reducers: {
    resetLessonSubjects: (state, action) => {
      state.lessonSubjects = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLessonSubjects.fulfilled, (state, action) => {
      if (action?.payload?.data?.items.length) {
        state.lessonSubjects = state.lessonSubjects.concat(action?.payload?.data?.items);
      }
    });
    builder.addCase(addLessonSubjects.fulfilled, (state, action) => {
      state.lessonSubjects = state.lessonSubjects.concat(action?.payload?.data);
    });
    builder.addCase(editLessonSubjects.fulfilled, (state, action) => {
      const {
        arg: {
          entity: { id },
        },
      } = action.meta;
      if (id) {
        state.lessonSubjects = [action?.payload?.data, ...state.lessonSubjects.filter((item) => item.id !== id)];
      }
    });
    builder.addCase(deleteLessonSubjects.fulfilled, (state, action) => {
      const { arg } = action.meta;
      if (arg) {
        state.lessonSubjects = state.lessonSubjects.filter((item) => item.id !== arg);
      }
    });
  },
});

export const { resetLessonSubjects } = lessonSubjectsSlice.actions;

export const getLessonSubjects = createAsyncThunk(
  'getLessonSubjects',
  async (body, { dispatch, getState, rejectWithValue }) => {
    try {
      //statede varsa request iptal
      const findLessonSubjects = getState()?.lessonSubjects.lessonSubjects.find(
        (i) => i.lessonUnitId === body[0]?.value,
      );
      if (findLessonSubjects) return rejectWithValue();

      return await lessonSubjectsServices.getLessonSubjects(body);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const addLessonSubjects = createAsyncThunk('addLessonSubjects', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await lessonSubjectsServices.addLessonSubjects(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const deleteLessonSubjects = createAsyncThunk(
  'deleteLessonSubjects',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await lessonSubjectsServices.deleteLessonSubjects(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const editLessonSubjects = createAsyncThunk(
  'editLessonSubjects',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await lessonSubjectsServices.editLessonSubjects(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
