import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cardOrderServices from '../../services/cardOrder.services';
import { setCardList } from './cardOrderDetailtsSlice';

export const getCurrentCardOrder = createAsyncThunk(
  'getCurrentCardOrder',
  async (body, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }
      return await cardOrderServices.getCurrentCardOrder({ customerId });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getCardOrders = createAsyncThunk(
  'getCardOrders',
  async ({ id }, { getState, dispatch, rejectWithValue }) => {
    try {
      const currentId = await getState()?.cardOrder?.currentCardOrder?.id;
      if (!id && !currentId) {
        await dispatch(getCurrentCardOrder());
      }
      return await cardOrderServices.getCardOrders({ id: id || currentId });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const cardOrdersSave = createAsyncThunk(
  'cardOrdersSave',
  async (body, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }
      return await cardOrderServices.cardOrdersSave({ entity: { ...body, customerId } });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getDraftedCardOrders = createAsyncThunk(
  'getDraftedCardOrders',
  async ({ pageNumber, pageSize }, { getState, dispatch, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }
      return await cardOrderServices.getDraftedCardOrders({
        customerId,
        pageNumber,
        pageSize,
      });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const cardOrdersUpdate = createAsyncThunk(
  'cardOrdersUpdate',
  async (body, { getState, rejectWithValue }) => {
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

      return await cardOrderServices.cardOrdersUpdate({ entity: { ...body, customerId } });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const cardOrdersDelete = createAsyncThunk(
  'cardOrdersDelete',
  async (body, { getState, dispatch, rejectWithValue }) => {
    try {
      const currentCardOrderId = await getState()?.cardOrder?.currentCardOrder?.id;
      if (!currentCardOrderId) {
        return rejectWithValue({
          message: 'Kayıt bulunamadı.',
        });
      }
      const response = await cardOrderServices.cardOrdersDelete({ id: currentCardOrderId });
      await dispatch(setCardList([]));
      await dispatch(getCurrentCardOrder());
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const deleteUnCompleted = createAsyncThunk(
  'deleteUnCompleted',
  async (body, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await cardOrderServices.deleteUnCompleted();
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  activeStep: 0,
  draftedCardOrders: [],
  currentCardOrder: {},
  draftedTableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
};

const orderSucceeded = (state, action) => {
  state.currentCardOrder = action?.payload?.data;
  if (action?.payload?.data?.orderStatus === 10) {
    state.activeStep = 1;
  } else if (action?.payload?.data?.orderStatus === 20) {
    state.activeStep = 2;
  } else if (action?.payload?.data?.orderStatus === 100) {
    state.activeStep = 3;
  } else {
    state.activeStep = 0;
  }
};

const orderFailed = (state) => {
  state.currentCardOrder = {};
  state.activeStep = 0;
};

export const cardOrderSlice = createSlice({
  name: 'cardOrder',
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
    setCurrentCardOrder: (state, action) => {
      state.currentCardOrder = {
        ...state.currentCardOrder,
        ...action.payload,
      };
    },
    reset: (state) => {
      state.activeStep = 0;
      state.currentCardOrder = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentCardOrder.fulfilled, (state, action) => {
      orderSucceeded(state, action);
    });
    builder.addCase(getCurrentCardOrder.rejected, (state) => {
      orderFailed(state);
    });
    builder.addCase(getCardOrders.fulfilled, (state, action) => {
      orderSucceeded(state, action);
    });
    builder.addCase(getCardOrders.rejected, (state) => {
      orderFailed(state);
    });
    builder.addCase(cardOrdersSave.fulfilled, (state, action) => {
      orderSucceeded(state, action);
    });
    builder.addCase(cardOrdersSave.rejected, (state, action) => {
      orderFailed(state);
    });
    builder.addCase(cardOrdersUpdate.fulfilled, (state, action) => {
      orderSucceeded(state, action);
    });
    builder.addCase(cardOrdersUpdate.rejected, (state) => {
      orderFailed(state);
    });
    builder.addCase(getDraftedCardOrders.fulfilled, (state, action) => {
      state.draftedCardOrders = action?.payload?.data?.items || [];
      state.draftedTableProperty = action?.payload?.data?.pagedProperty || {};
    });
    builder.addCase(getDraftedCardOrders.rejected, (state, action) => {
      state.draftedCardOrders = [];
      state.draftedTableProperty = {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: 0,
      };
    });
  },
});

export const { nextStep, prevStep, setCurrentCardOrder, setActiveStep, reset } =
  cardOrderSlice.actions;
