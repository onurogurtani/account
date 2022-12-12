import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userServices from '../../services/user.service';
import schoolsServices from '../../services/schools.services';

export const getByFilterPagedUsers = createAsyncThunk(
  'usersManagement/getByFilterPagedUsers',
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      let urlString;
      if (data) {
        let urlArr = [];
        for (let item in data) {
          if (data[item] !== undefined && data[item] !== '') {
            if (Array.isArray(data[item])) {
              data[item]?.map((element, idx) => {
                let newStr = `UserDetailSearch.${item}=${data[item][idx]}`;
                urlArr.push(newStr);
              });
            } else {
              let newStr = `UserDetailSearch.${item}=${data[item]}`;
              urlArr.push(newStr);
            }
          }
        }
        if (!data.OrderBy) {
          let newStr = `UserDetailSearch.OrderBy=UpdateTimeDESC`;
          urlArr.push(newStr);
        }
        if (!data.PageNumber) {
          let newStr = `UserDetailSearch.PageNumber=1`;
          urlArr.push(newStr);
        }
        if (!data.PageSize) {
          let newStr = `UserDetailSearch.PageSize=10`;
          urlArr.push(newStr);
        }
        urlString = urlArr.join('&');
      } else {
        urlString =
          'UserDetailSearch.OrderBy=UpdateTimeDESC&UserDetailSearch.PageNumber=1&UserDetailSearch.PageSize=10';
      }
      const response = await userServices.getByFilterPagedUsers(urlString);
      dispatch(setFilterObject(data));
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const editUser = createAsyncThunk('usersManagement/editUser', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await userServices.editUser(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const addUser = createAsyncThunk('usersManagement/addUser', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await userServices.addUser(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const deleteUser = createAsyncThunk(
  'usersManagement/deleteUser',
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await userServices.deleteUser(data);
      await dispatch(getByFilterPagedUsers(getState()?.userList.filterObject));
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getSchools = createAsyncThunk('userList/getSchools', async (body, { rejectWithValue }) => {
  try {
    return await schoolsServices.getSchools(body);
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const getByUserId = createAsyncThunk(
  'usersManagement/getByUserId',
  async (data, { dispatch, getState, rejectWithValue }) => {
    const { id, errorDialog, history } = data;
    try {
      const userFindState = getState()?.userList.usersList.find((item) => item.id === Number(id));
      if (userFindState) return { data: userFindState };
      //statede yok ise servisten getir
      const response = await userServices.getByUserId(id);
      return response;
    } catch (error) {
      errorDialog({
        title: 'Hata',
        message: error?.data?.message,
      });
      history.push('/user-management/user-list-management/list');
      return rejectWithValue(error?.data);
    }
  },
);
export const setUserStatus = createAsyncThunk(
  'usersManagement/setUserStatus',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await userServices.setUserStatus(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
const initialState = {
  usersList: [],
  selectedUser: undefined,
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 0,
    totalCount: 0,
  },
  isFilter: false,
  filterObject: {},
  sorterObject: {},
};

export const userListSlice = createSlice({
  name: 'userList',
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
    builder.addCase(getByFilterPagedUsers.fulfilled, (state, action) => {
      state.usersList = action?.payload?.data?.items || [];
      state.tableProperty = action?.payload?.data?.pagedProperty || {};
    });
    builder.addCase(getByFilterPagedUsers.rejected, (state, action) => {
      state.usersList = [];
      state.tableProperty = {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: 0,
      };
    });
    builder.addCase(getByUserId.fulfilled, (state, action) => {
      state.selectedUser = action?.payload?.data;
    });
    builder.addCase(getByUserId.rejected, (state) => {
      state.selectedUser = undefined;
    });
    builder.addCase(setUserStatus.fulfilled, (state, action) => {
      const {
        arg: { id, status },
      } = action.meta;
      if (id) {
        state.usersList = state.usersList.map((item) => (item.id === id ? { ...item, status } : item));
      }
    });
  },
});
export const { setFilterObject, setSorterObject, setIsFilter } = userListSlice.actions;
