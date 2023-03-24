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

export const uploadTeacherExcel = createAsyncThunk('teachers/uploadTeacherExcel', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await teachersServices.uploadTeacherExcel(data);
    dispatch(getByFilterPagedTeachers());
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const setTeacherActivateStatus = createAsyncThunk('teachers/setTeacherActivateStatus', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await teachersServices.setTeacherActivateStatus(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const addTeacher = createAsyncThunk('teachers/addTeacher', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await teachersServices.addTeacher(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const editTeacher = createAsyncThunk('teachers/addTeacher', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await teachersServices.editTeacher(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const getTeacherById = createAsyncThunk('teachers/getTeacherById', async (id, { dispatch, rejectWithValue }) => {
  try {
    const response = await teachersServices.getTeacherById(id);
    return response?.data;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const downloadTeacherExcel = createAsyncThunk('teachers/downloadTeacherExcel', async (body, { rejectWithValue }) => {
  try {
    return await teachersServices.downloadTeacherExcel();
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

const initialState = {
  teacherList: [],
  selectedTeacher: undefined,
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
    builder.addCase(setTeacherActivateStatus.fulfilled, (state, action) => {
      const {
        arg: { id, status },
      } = action.meta;
      if (id) {
        state.teacherList = state.teacherList.map((item) => (item.id === id ? { ...item, status } : item));
      }
    });
    builder.addCase(getTeacherById.fulfilled, (state, action) => {
      state.selectedTeacher = action?.payload;
    });
    builder.addCase(getTeacherById.rejected, (state) => {
      state.selectedTeacher = undefined;
    });
  },
});

export const { setTeachersDetailSearch } = teachersSlice.actions;
