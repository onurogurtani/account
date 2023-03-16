import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import teachersServices from '../../services/teachers.service';

export const getByFilterPagedTeachers = createAsyncThunk('teachers/getByFilterPagedTeachers', async (data = {}, { getState, dispatch, rejectWithValue }) => {
  try {
    const response = await teachersServices.getByFilterPagedTeachers({
      ...data,
      ...data?.body,
      body: undefined,
    });
    dispatch(setTeachersDetailSearch(data));
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const setTeacherStatus = createAsyncThunk('teachers/setTeacherStatus', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await teachersServices.setTeacherStatus(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

const initialState = {
  teacherList: [],
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 0,
    totalCount: 0,
  },
  teachersDetailSearch: {
    pagination: {
      pageNumber: 1,
      pageSize: 10,
    },
    body: {},
    orderBy: 'UpdateTimeDESC',
  },
};

export const teachersSlice = createSlice({
  name: 'teachersSlice',
  initialState,
  reducers: {
    setTeachersDetailSearch: (state, action) => {
      state.teachersDetailSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getByFilterPagedTeachers.fulfilled, (state, action) => {
      state.teacherList = action?.payload?.data?.items || [];
      state.tableProperty = action?.payload?.data?.pagedProperty || {};
    });
    builder.addCase(getByFilterPagedTeachers.rejected, (state, action) => {
      state.teacherList = [];
      state.tableProperty = {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: 0,
      };
    });
    builder.addCase(setTeacherStatus.fulfilled, (state, action) => {
      const {
        arg: { id, status },
      } = action.meta;
      if (id) {
        state.teacherList = state.teacherList.map((item) => (item.id === id ? { ...item, status } : item));
      }
    });
  },
});

export const { setTeachersDetailSearch } = teachersSlice.actions;
