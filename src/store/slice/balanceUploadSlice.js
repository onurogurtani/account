import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import balanceUploadServices from '../../services/balanceUpload.services';
import { getLoadBalanceDetailsGetPagedList } from './balanceUploadDetailSlice';

export const getCurrentLoadBalance = createAsyncThunk(
  'getCurrentLoadBalance',
  async (body, { getState, dispatch, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }
      let res = await balanceUploadServices.getCurrentLoadBalance({ customerId });
      if (res?.data?.id) {
        await dispatch(
          getLoadBalanceDetailsGetPagedList({ body: { loadBalanceId: res?.data?.id } }),
        );
      }
      return res;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getById = createAsyncThunk(
  'getById',
  async (id, { getState, dispatch, rejectWithValue }) => {
    try {
      const res = await balanceUploadServices.getById({ id });
      if (res?.data?.id) {
        await dispatch(
          getLoadBalanceDetailsGetPagedList({ body: { loadBalanceId: res?.data?.id } }),
        );
      }
      return res;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getPreviousLoadBalance = createAsyncThunk(
  'getPreviousLoadBalance',
  async (body, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }
      return await balanceUploadServices.getPreviousLoadBalance({
        customerId,
        integrationId: body?.integrationId,
      });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getDraftedLoadBalances = createAsyncThunk(
  'getDraftedLoadBalances',
  async ({ pageNumber, pageSize }, { getState, dispatch, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }
      return await balanceUploadServices.getDraftedLoadBalances({
        customerId,
        pageNumber,
        pageSize,
      });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const prepareLoadBalance = createAsyncThunk(
  'prepareLoadBalance',
  async (body, { getState, dispatch, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }
      const res = await balanceUploadServices.prepareLoadBalance({ ...body, customerId });
      if (res?.data?.id) {
        await dispatch(
          getLoadBalanceDetailsGetPagedList({ body: { loadBalanceId: res?.data?.id } }),
        );
      }
      return res;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const loadBalancesSave = createAsyncThunk(
  'loadBalancesSave',
  async (body, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }
      return await balanceUploadServices.loadBalancesSave({ entity: { ...body, customerId } });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const loadBalancesUpdate = createAsyncThunk(
  'loadBalancesUpdate',
  async (body, { getState, rejectWithValue, dispatch }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }
      if (!body?.id) {
        return rejectWithValue({
          message: 'Kayıt bulunamadı.',
        });
      }
      return await balanceUploadServices.loadBalancesUpdate({ entity: { ...body, customerId } });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const loadBalancesDelete = createAsyncThunk(
  'loadBalancesDelete',
  async (body, { getState, dispatch, rejectWithValue }) => {
    try {
      const currentLoadBalanceId = await getState()?.balanceUpload?.currentLoadBalance?.id;
      if (!currentLoadBalanceId) {
        return rejectWithValue({
          message: 'Kayıt bulunamadı.',
        });
      }
      const response = await balanceUploadServices.loadBalancesDelete({ id: currentLoadBalanceId });
      await dispatch(getCurrentLoadBalance());
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const copyLoadBalance = createAsyncThunk(
  'copyLoadBalance',
  async (body, { getState, rejectWithValue }) => {
    try {
      return await balanceUploadServices.copyLoadBalance(body);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const getLoadBalanceSucceeded = (state, action) => {
  state.currentLoadBalance = action?.payload?.data;

  if (action?.payload?.data?.orderStatus === 0) {
    state.activeStep = 0;
  } else if (action?.payload?.data?.orderStatus === 10) {
    state.activeStep = 1;
  } else if (action?.payload?.data?.orderStatus === 20) {
    state.activeStep = 2;
  } else if (action?.payload?.data?.orderStatus === 100) {
    state.activeStep = 3;
  }
};

const initialState = {
  activeStep: 0,
  currentLoadBalance: {},
  draftedLoadBalances: [],
  draftedTableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
};

export const balanceUploadSlice = createSlice({
  name: 'balanceUpload',
  initialState,
  reducers: {
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    nextStep: (state) => {
      state.activeStep = state.activeStep + 1;
    },
    prevStep: (state) => {
      state.activeStep = state.activeStep - 1;
    },
    setCurrentLoadBalance: (state, action) => {
      state.currentLoadBalance = {
        ...state.currentLoadBalance,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getById.fulfilled, (state, action) => {
      getLoadBalanceSucceeded(state, action);
    });
    builder.addCase(getCurrentLoadBalance.fulfilled, (state, action) => {
      getLoadBalanceSucceeded(state, action);
    });
    builder.addCase(loadBalancesUpdate.fulfilled, (state, action) => {
      getLoadBalanceSucceeded(state, action);
    });
    builder.addCase(loadBalancesSave.fulfilled, (state, action) => {
      getLoadBalanceSucceeded(state, action);
    });
    builder.addCase(getPreviousLoadBalance.fulfilled, (state, action) => {
      state.currentLoadBalance = action?.payload?.data;
      state.activeStep = 0;
    });
    builder.addCase(getDraftedLoadBalances.fulfilled, (state, action) => {
      state.draftedLoadBalances = action?.payload?.data?.items || [];
      state.draftedTableProperty = action?.payload?.data?.pagedProperty || {};
    });
    builder.addCase(getDraftedLoadBalances.rejected, (state, action) => {
      state.draftedLoadBalances = [];
      state.draftedTableProperty = {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: 0,
      };
    });
    builder.addCase(prepareLoadBalance.fulfilled, (state, action) => {
      state.currentLoadBalance = action?.payload?.data;
      state.activeStep = 0;
    });
  },
});

export const { nextStep, prevStep, setCurrentLoadBalance, setActiveStep } =
  balanceUploadSlice.actions;
