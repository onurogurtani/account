import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cardOrderDetailsServices from '../../services/cardOrderDetails.services';
import { getCardOrders } from './cardOrderSlice';

export const cardOrderDetailsGelAll = createAsyncThunk(
  'cardOrderDetailsGelAll',
  async ({ pageNumber, pageSize }, { getState, rejectWithValue }) => {
    try {
      const currentCardOrderId = await getState()?.cardOrder?.currentCardOrder?.id;
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!currentCardOrderId || !customerId) {
        return rejectWithValue({});
      }
      const body = {
        customerId: customerId,
        cardOrderId: currentCardOrderId,
      };

      return await cardOrderDetailsServices.cardOrderDetailsGelAll({
        data: body,
        pageNumber: pageNumber || 1,
        pageSize: pageSize || 10,
      });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const cardOrderDetailSave = createAsyncThunk(
  'cardOrderDetailSave',
  async (body, { getState, dispatch, rejectWithValue }) => {
    try {
      const currentCardOrderId = await getState()?.cardOrder?.currentCardOrder?.id;
      if (!currentCardOrderId) {
        return rejectWithValue({});
      }
      const response = await cardOrderDetailsServices.cardOrderDetailSave({
        entity: {
          ...body,
          cardOrderId: currentCardOrderId,
        },
      });
      await dispatch(getCardOrders({ id: currentCardOrderId }));
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const cardOrderDetailUpdate = createAsyncThunk(
  'cardOrderDetailUpdate',
  async (body, { getState, dispatch, rejectWithValue }) => {
    try {
      const currentCardOrderId = await getState()?.cardOrder?.currentCardOrder?.id;
      if (!currentCardOrderId) {
        return rejectWithValue({});
      }
      const response = await cardOrderDetailsServices.cardOrderDetailUpdate({
        entity: {
          ...body,
          cardOrderId: currentCardOrderId,
        },
      });
      await dispatch(getCardOrders({ id: currentCardOrderId }));
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const cardOrderDetailDelete = createAsyncThunk(
  'cardOrderDetailDelete',
  async ({ id }, { dispatch, getState, rejectWithValue }) => {
    try {
      const currentCardOrderId = await getState()?.cardOrder?.currentCardOrder?.id;
      const response = await cardOrderDetailsServices.cardOrderDetailDelete({ id });
      await dispatch(getCardOrders({ id: currentCardOrderId }));
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  cardList: [],
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
  selectedRow: {},
  allCardAddressCheckedData: {},
};

export const cardOrderDetailsSlice = createSlice({
  name: 'cardOrderDetails',
  initialState,
  reducers: {
    setCardList: (state, action) => {
      state.cardList = action.payload;
    },
    setSelectedRow: (state, action) => {
      state.selectedRow = action.payload;
    },
    setAllCardAddressCheckedData: (state, action) => {
      state.allCardAddressCheckedData = action.payload;
    },
    resetDetail: (state) => {
      state.cardList = [];
      state.tableProperty = {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: 0,
      };
      state.selectedRow = {};
      state.allCardAddressCheckedData = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cardOrderDetailsGelAll.fulfilled, (state, action) => {
      state.cardList = action?.payload?.data?.items || [];
      state.tableProperty = action?.payload?.data?.pagedProperty || {};
    });
    builder.addCase(cardOrderDetailsGelAll.rejected, (state, action) => {
      state.cardList = [];
      state.tableProperty = {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: 0,
      };
    });
  },
});

export const { setCardList, setSelectedRow, setAllCardAddressCheckedData, resetDetail } =
  cardOrderDetailsSlice.actions;
