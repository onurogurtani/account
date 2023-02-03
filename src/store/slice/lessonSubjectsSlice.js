import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import lessonSubjectsServices from '../../services/lessonSubjects.services';

const initialState = {
  lessonSubjects: [],
  lessonSubjectsFilter: [],
};

export const lessonSubjectsSlice = createSlice({
  name: 'lessonSubjectsSlice',
  initialState,
  reducers: {
    resetLessonSubjects: (state, action) => {
      state.lessonSubjects = [];
    },
    resetLessonSubjectsFilter: (state, action) => {
      state.lessonSubjectsFilter = [];
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
    builder.addCase(getLessonSubjectsList.fulfilled, (state, action) => {
      state.lessonSubjects = action?.payload?.data?.items;
    });
    builder.addCase(getLessonSubjectsListFilter.fulfilled, (state, action) => {
      state.lessonSubjectsFilter = action?.payload?.data?.items;
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

export const { resetLessonSubjects, resetLessonSubjectsFilter } = lessonSubjectsSlice.actions;

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
export const getLessonSubjectsList = createAsyncThunk(
  'getLessonSubjectsList',
  async (body, { dispatch, getState, rejectWithValue }) => {
    try {
      return await lessonSubjectsServices.getLessonSubjects(body);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const getLessonSubjectsListFilter = createAsyncThunk(
  'getLessonSubjectsListFilter',
  async (body, { dispatch, getState, rejectWithValue }) => {
    try {
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
