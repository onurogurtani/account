import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import packageServices from '../../services/package.services';
import { getByFilterPagedParamsHelper } from '../../utils/utils';

export const getByFilterPagedPackages = createAsyncThunk(
  'getByFilterPagedPackages',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const params = getByFilterPagedParamsHelper(data, 'PackageDetailSearch.');
      const response = await packageServices.getByFilterPagedPackages(params);

      dispatch(setFilterObject(data));
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const getPackageById = createAsyncThunk('getPackageById', async (id, { dispatch, rejectWithValue }) => {
  try {
    const response = await packageServices.getPackageById(id);
    return response?.data;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const addPackage = createAsyncThunk('addPackage', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await packageServices.addPackage(data);
    await dispatch(getByFilterPagedPackages());
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const updatePackage = createAsyncThunk('updatePackage', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await packageServices.updatePackage(data);
    await dispatch(getByFilterPagedPackages());
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const getPackageNames = createAsyncThunk('getPackageNames', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await packageServices.getPackageNames();
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

const initialState = {
  packages: [],
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
  selectedPackages: [],
  isFilter: false,
  filterObject: {},
  sorterObject: {},
  allPackagesName: [],
};

export const packageSlice = createSlice({
  name: 'packageSlice',
  initialState,
  reducers: {
    setSorterObject: (state, action) => {
      state.sorterObject = action.payload;
    },
    setIsFilter: (state, action) => {
      state.isFilter = action.payload;
    },
    setFilterObject: (state, action) => {
      state.filterObject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getByFilterPagedPackages.fulfilled, (state, action) => {
      state.packages = action?.payload?.data?.items.reverse();
      state.tableProperty = action?.payload?.data?.pagedProperty;
    });
    builder.addCase(getByFilterPagedPackages.rejected, (state) => {
      state.packages = [];
    });
    builder.addCase(getPackageById.fulfilled, (state, action) => {
      state.selectedPackages = action?.payload;
      state.tableProperty = action?.payload?.data?.pagedProperty;
    });
    builder.addCase(getPackageById.rejected, (state) => {
      state.selectedPackages = [];
    });
    builder.addCase(getPackageNames.fulfilled, (state, action) => {
      state.allPackagesName = action?.payload?.data;
    });
    builder.addCase(getPackageNames.rejected, (state) => {
      state.allPackagesName = [];
    });
  },
});

export const { setFilterObject, setSorterObject, setIsFilter } = packageSlice.actions;
