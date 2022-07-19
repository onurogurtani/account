import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import mobilExpressServices from '../../services/mobilExpress.services';

export const storedCardGelAll = createAsyncThunk(
  'storedCardGelAll',
  async (body, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }
      return await mobilExpressServices.storedCardGelAll({
        ...body,
        customerId: customerId.toString(),
      });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const storedCardSave = createAsyncThunk(
  'storedCardSave',
  async (body, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }
      body.cardNumber = body.cardNumber.replaceAll('-', '');
      return await mobilExpressServices.storedCardSave({
        ...body,
        customerInfo: { customerId: customerId.toString() },
      });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const processPayment = createAsyncThunk(
  'processPayment',
  async (body, { rejectWithValue }) => {
    try {
      if (!body?.body?.customerInfo?.customerId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }
      return await mobilExpressServices.processPayment(body);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getBankOfBinNumber = createAsyncThunk(
  'getBankOfBinNumber',
  async (body, { rejectWithValue }) => {
    try {
      return await mobilExpressServices.getBankOfBinNumber(body);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const finishPaymentProcess = createAsyncThunk(
  'finishPaymentProcess',
  async (body, { getState, rejectWithValue }) => {
    try {
      return await mobilExpressServices.finishPaymentProcess({ ...body });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  paymentType: 1,
  storedCard: [],
  selectedStoredCard: '',
};

export const mobilExpressSlice = createSlice({
  name: 'mobilExpress',
  initialState,
  reducers: {
    setPaymentType: (state, action) => {
      state.paymentType = action.payload;
    },
    setSelectStoredCard: (state, action) => {
      state.selectedStoredCard = action.payload;
    },
    reset: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(storedCardGelAll.fulfilled, (state, action) => {
      if (action?.payload?.data?.cardList?.length > 0) {
        state.storedCard = action.payload.data.cardList;
        state.selectedStoredCard = action.payload.data.cardList[0]?.cardToken;
      } else {
        state.storedCard = [];
        state.selectedStoredCard = '';
      }
    });
    builder.addCase(storedCardGelAll.rejected, (state) => {
      state.storedCard = [];
      state.selectedStoredCard = '';
    });
    builder.addCase(storedCardSave.fulfilled, (state, action) => {
      return {
        initialState,
      };
    });
  },
});

export const { setPaymentType, setSelectStoredCard, reset } = mobilExpressSlice.actions;
