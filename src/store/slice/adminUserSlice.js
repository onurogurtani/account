import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminUsersServices from '../../services/adminUser.service';

export const getByFilterPagedAdminUsers = createAsyncThunk('adminUsersManagement/getByFilterPagedAdminUsers', async (data, { getState, dispatch, rejectWithValue }) => {
  try {
    let urlString;
    if (data) {
      let urlArr = [];
      for (let item in data) {
        if (data[item] !== undefined) {
          if (Array.isArray(data[item])) {
            data[item]?.map((element, idx) => {
              let newStr = `AdminDetailSearch.${item}=${data[item][idx]}`;
              urlArr.push(newStr);
            });
          } else {
            let newStr = `AdminDetailSearch.${item}=${data[item]}`;
            urlArr.push(newStr);
          }
        }
      }
      if (!data.OrderBy) {
        let newStr = `AdminDetailSearch.OrderBy=UpdateTimeDESC`;
        urlArr.push(newStr);
      }
      if (!data.PageNumber) {
        let newStr = `AdminDetailSearch.PageNumber=1`;
        urlArr.push(newStr);
      }
      if (!data.PageSize) {
        let newStr = `AdminDetailSearch.PageSize=10`;
        urlArr.push(newStr);
      }
      urlString = urlArr.join('&');
    } else {
      urlString = 'AdminDetailSearch.OrderBy=UpdateTimeDESC&AdminDetailSearch.PageNumber=1&AdminDetailSearch.PageSize=10';
    }
    const response = await adminUsersServices.getByFilterPagedAdminUsers(urlString);
    dispatch(setFilterObject(data));
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const getByAdminUserId = createAsyncThunk('adminUsersManagement/getByAdminUserId', async (data, { dispatch, rejectWithValue }) => {
  const { id, errorDialog, history } = data;
  try {
    console.log(id, history);
    const response = await adminUsersServices.getByAdminUserId(id);
    return response;
  } catch (error) {
    errorDialog({
      title: 'Hata',
      message: error?.data?.message,
    });
    history.push('/admin-users-management/list');
    return rejectWithValue(error?.data);
  }
});

export const addAdminUser = createAsyncThunk('adminUsersManagement/addAdminUser', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await adminUsersServices.addAdminUser(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const editAdminUser = createAsyncThunk('adminUsersManagement/editAdminUser', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await adminUsersServices.editAdminUser(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const deleteAdminUser = createAsyncThunk('adminUsersManagement/deleteAdminUser', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await adminUsersServices.deleteAdminUser(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const setAdminUserStatus = createAsyncThunk('adminUsersManagement/setAdminUserStatus', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await adminUsersServices.setAdminUserStatus(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

const initialState = {
  adminUsers: [],
  currentAdminUser: undefined,
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
  isFilter: false,
  filterObject: {},
  sorterObject: {},
};

export const adminUserSlice = createSlice({
  name: 'adminUserList',
  initialState,
  reducers: {
    setFilterObject: (state, action) => {
      state.filterObject = action.payload;
    },
    setSorterObject: (state, action) => {
      state.sorterObject = action.payload;
    },
    setIsFilter: (state, action) => {
      state.isFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getByFilterPagedAdminUsers.fulfilled, (state, action) => {
      state.adminUsers = action?.payload?.data?.items || [];
      state.tableProperty = action?.payload?.data?.pagedProperty || {};
    });
    builder.addCase(getByFilterPagedAdminUsers.rejected, (state, action) => {
      state.adminUsers = [];
      state.tableProperty = {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: 0,
      };
    });
    builder.addCase(getByAdminUserId.fulfilled, (state, action) => {
      state.currentAdminUser = action?.payload?.data;
    });
    builder.addCase(getByAdminUserId.rejected, (state) => {
      state.currentAdminUser = undefined;
    });
    builder.addCase(setAdminUserStatus.fulfilled, (state, action) => {
      const {
        arg: { id, status },
      } = action.meta;
      if (id) {
        state.adminUsers = state.adminUsers.map((item) => (item.id === id ? { ...item, status } : item));
      }
    });
  },
});

export const { setFilterObject, setSorterObject, setIsFilter } = adminUserSlice.actions;
