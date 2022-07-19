import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import balanceUploadDetailServices from '../../services/balanceUploadDetail.services';
import { getById } from './balanceUploadSlice';

export const getLoadBalanceDetailsGetPagedList = createAsyncThunk(
  'getLoadBalanceDetailsGetPagedList',
  async (
    { body, pageNumber, pageSize, isFilter = true },
    { getState, dispatch, rejectWithValue },
  ) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }
      const { detailTableFilter } = getState()?.balanceUploadDetail;
      const filterBody = isFilter
        ? body && { ...detailTableFilter.body, ...body, customerId }
        : body;
      const pageNum = pageNumber || detailTableFilter?.pageNum || 1;
      const pageS = pageSize || detailTableFilter?.pageS || 10;
      const res = await balanceUploadDetailServices.loadBalanceDetailsGetPagedList(
        { ...filterBody },
        pageNum,
        pageS,
      );
      isFilter && (await dispatch(setDetailTableFilter({ body: filterBody, pageNum, pageS })));
      return res;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const loadBalanceDetailPriceUpdate = createAsyncThunk(
  'loadBalanceDetailPriceUpdate',
  async (body, { getState, dispatch, rejectWithValue }) => {
    try {
      const currentLoadBalanceId = await getState()?.balanceUpload?.currentLoadBalance?.id;
      if (!currentLoadBalanceId) {
        return rejectWithValue({
          message: 'Kayıt bulunamadı.',
        });
      }
      const res = await balanceUploadDetailServices.updateLoadBalanceDetailPrice(body);
      await dispatch(getById(currentLoadBalanceId));
      return res;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const loadBalanceDetailExcelUpload = createAsyncThunk(
  'loadBalanceDetailExcelUpload',
  async (body, { getState, dispatch, rejectWithValue }) => {
    try {
      const currentLoadBalance = await getState()?.balanceUpload?.currentLoadBalance;
      const currentLoadBalanceId = currentLoadBalance?.id;
      if (!currentLoadBalanceId) {
        return rejectWithValue({
          message: 'Kayıt bulunamadı.',
        });
      }
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }
      const data = new FormData();
      data.append('FormFile', body?.file, body?.fileName);
      data.append('CustomerId', customerId);
      data.append('LoadBalanceId', currentLoadBalanceId);
      data.append('ExcelUploadCheck.PeriodType', currentLoadBalance?.periodType);
      data.append('ExcelUploadCheck.FirstRowHeaderColumn', body?.firstRowHeader);
      data.append('ExcelUploadCheck.CardNumberColumn', body?.cardNumber);
      data.append('ExcelUploadCheck.RefNoColumn', body?.refNo);
      body?.dayCount && data.append('ExcelUploadCheck.DayCountColumn', body?.dayCount);
      data.append('ExcelUploadCheck.PriceColumn', body?.price);

      const res = await balanceUploadDetailServices.loadBalanceDetailExcelUpload(data);
      await dispatch(getById(currentLoadBalanceId));
      return res;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const loadBalanceDetailExcelTemplate = createAsyncThunk(
  'loadBalanceDetailExcelTemplate',
  async (body, { getState, dispatch, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }

      const res = await balanceUploadDetailServices.loadBalanceDetailExcelTemplate({
        ...body,
        customerId,
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const loadBalanceDetailUpdate = createAsyncThunk(
  'loadBalanceDetailUpdate',
  async (body, { getState, dispatch, rejectWithValue }) => {
    try {
      const currentLoadBalanceId = await getState()?.balanceUpload?.currentLoadBalance?.id;
      if (!currentLoadBalanceId) {
        return rejectWithValue({
          message: 'Kayıt bulunamadı.',
        });
      }
      const res = await balanceUploadDetailServices.loadBalanceDetailUpdate(body);
      const { detailTableFilter } = getState()?.balanceUploadDetail;
      await dispatch(getLoadBalanceDetailsGetPagedList(detailTableFilter));
      await dispatch(getById(currentLoadBalanceId));
      return res;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  selectedBalanceUploadDetails: [],
  detailTableFilter: {},
  balanceUploadDetails: [],
  excelUploadStatus: false,
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
};

export const balanceUploadDetailSlice = createSlice({
  name: 'balanceUploadDetail',
  initialState,
  reducers: {
    setBalanceUploadDetails: (state, action) => {
      state.balanceUploadDetails = action.payload;
    },
    setDetailTableFilter: (state, action) => {
      state.detailTableFilter = action.payload;
    },
    setSelectedBalanceUploadDetails: (state, action) => {
      state.selectedBalanceUploadDetails = action.payload;
    },
    setExcelUploadStatus: (state, action) => {
      state.excelUploadStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoadBalanceDetailsGetPagedList.fulfilled, (state, action) => {
      state.balanceUploadDetails = action?.payload?.data?.items || [];
      state.tableProperty = action?.payload?.data?.pagedProperty || {};
    });
    builder.addCase(getLoadBalanceDetailsGetPagedList.rejected, (state, action) => {
      state.balanceUploadDetails = [];
      state.tableProperty = {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: 0,
      };
    });
    builder.addCase(loadBalanceDetailExcelUpload.fulfilled, (state) => {
      state.excelUploadStatus = true;
    });
  },
});

export const {
  setSelectedBalanceUploadDetails,
  setBalanceUploadDetails,
  setDetailTableFilter,
  setExcelUploadStatus,
} = balanceUploadDetailSlice.actions;
