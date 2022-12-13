import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import lessonsServices from '../../services/lessons.services';

export const getLessonDetailSearch = createAsyncThunk(
  'getLessonDetailSearch',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      return await lessonsServices.getLessonDetailSearch(id);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const getLessons = createAsyncThunk('getLessons', async (body, { dispatch, getState, rejectWithValue }) => {
  try {
    //statede varsa request iptal
    const findLessons = getState()?.lessons.lessons.find((i) => i.classroomId === body[0]?.value);
    if (findLessons) return { data: { items: [] } };

    return await lessonsServices.getLessons(body);
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const getUnits = createAsyncThunk('getUnits', async (body, { dispatch, getState, rejectWithValue }) => {
  try {
    //statede varsa request iptal
    const findUnits = getState()?.lessons.units.find((i) => i.lessonId === body[0]?.value);
    if (findUnits) return { data: { items: [] } };

    return await lessonsServices.getUnits(body);
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const getLessonSubjects = createAsyncThunk(
  'getLessonSubjects',
  async (body, { dispatch, getState, rejectWithValue }) => {
    try {
      //statede varsa request iptal
      const findLessonSubjects = getState()?.lessons.lessonSubjects.find((i) => i.lessonUnitId === body[0]?.value);
      if (findLessonSubjects) return { data: { items: [] } };

      return await lessonsServices.getLessonSubjects(body);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getLessonSubSubjects = createAsyncThunk(
  'getLessonSubSubjects',
  async (body, { dispatch, getState, rejectWithValue }) => {
    try {
      //statede varsa request iptal
      const findLessonSubSubjects = getState()?.lessons.lessonSubSubjects.find(
        (i) => i.lessonSubjectId === body[0]?.value,
      );
      if (findLessonSubSubjects) return { data: { items: [] } };

      return await lessonsServices.getLessonSubSubjects(body);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const downloadLessonsExcel = createAsyncThunk(
  'downloadLessonsExcel',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await lessonsServices.downloadLessonsExcel();
      return response;
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
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
const initialState = {
  filteredLessons: [],
  lessons: [],
  units: [],
  lessonSubjects: [],
  lessonSubSubjects: [],
};

export const lessonsSlice = createSlice({
  name: 'lessonsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLessonDetailSearch.fulfilled, (state, action) => {
      state.filteredLessons = action?.payload?.data?.items;
    });
    builder.addCase(getLessons.fulfilled, (state, action) => {
      console.log(action);
      state.lessons = state.lessons.concat(action?.payload?.data?.items);
    });
    builder.addCase(getLessons.rejected, (state) => {
      state.lessons = [];
    });
    builder.addCase(getUnits.fulfilled, (state, action) => {
      state.units = state.units.concat(action?.payload?.data?.items);
    });
    builder.addCase(getUnits.rejected, (state) => {
      state.units = [];
    });
    builder.addCase(getLessonSubjects.fulfilled, (state, action) => {
      state.lessonSubjects = state.lessonSubjects.concat(action?.payload?.data?.items);
    });
    builder.addCase(getLessonSubjects.rejected, (state) => {
      state.lessonSubjects = [];
    });
    builder.addCase(getLessonSubSubjects.fulfilled, (state, action) => {
      state.lessonSubSubjects = state.lessonSubSubjects.concat(action?.payload?.data?.items);
    });
    builder.addCase(getLessonSubSubjects.rejected, (state) => {
      state.lessonSubSubjects = [];
    });
  },
});
