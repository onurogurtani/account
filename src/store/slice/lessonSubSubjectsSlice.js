import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import lessonSubSubjectsServices from '../../services/lessonSubSubjects.services';

const initialState = {
  lessonSubSubjects: [],
};

export const lessonSubSubjectsSlice = createSlice({
  name: 'lessonSubSubjectsSlice',
  initialState,
  reducers: {
    resetLessonSubSubjects: (state, action) => {
      state.lessonSubSubjects = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLessonSubSubjects.fulfilled, (state, action) => {
      if (action?.payload?.data?.items.length) {
        state.lessonSubSubjects = state.lessonSubSubjects.concat(action?.payload?.data?.items);
      }
    });
    builder.addCase(addLessonSubSubjects.fulfilled, (state, action) => {
      state.lessonSubSubjects = state.lessonSubSubjects.concat(action?.payload?.data);
    });
    builder.addCase(editLessonSubSubjects.fulfilled, (state, action) => {
      const {
        arg: {
          entity: { id },
        },
      } = action.meta;
      if (id) {
        state.lessonSubSubjects = [action?.payload?.data, ...state.lessonSubSubjects.filter((item) => item.id !== id)];
      }
    });
    builder.addCase(deleteLessonSubSubjects.fulfilled, (state, action) => {
      const { arg } = action.meta;
      if (arg) {
        state.lessonSubSubjects = state.lessonSubSubjects.filter((item) => item.id !== arg);
      }
    });
  },
});

export const { resetLessonSubSubjects } = lessonSubSubjectsSlice.actions;
export const getLessonSubSubjects = createAsyncThunk(
  'getLessonSubSubjects',
  async (body, { dispatch, getState, rejectWithValue }) => {
    try {
      //statede varsa request iptal
      const findLessonSubSubjects = getState()?.lessonSubSubjects.lessonSubSubjects.find(
        (i) => i.lessonSubjectId === body[0]?.value,
      );
      if (findLessonSubSubjects) return rejectWithValue();

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

export const deleteLessonSubSubjects = createAsyncThunk(
  'deleteLessonSubSubjects',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await lessonSubSubjectsServices.deleteLessonSubSubjects(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
