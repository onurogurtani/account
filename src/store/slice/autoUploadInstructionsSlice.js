import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import autoUploadInstructionsServices from '../../services/autoUploadInstructions.services';

export const getInstructionsPageList = createAsyncThunk(
  'getInstructionsPageList',
  async ({ body, pageNumber, pageSize }, { getState, dispatch, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({});
      }
      const data = {
        customerId: customerId,
        ...body,
      };

      const response = await autoUploadInstructionsServices.getInstructionsList({
        data,
        pageNumber: pageNumber || 1,
        pageSize: pageSize || 10,
      });

      dispatch(
        setFilterObject({
          body,
          pageNumber,
          pageSize,
        }),
      );

      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getInstructionsDetailsPageList = createAsyncThunk(
  'getInstructionsDetailsPageList',
  async ({ body, pageNumber, pageSize }, { getState, dispatch, rejectWithValue }) => {
    try {
      console.log(body, pageNumber, pageSize);
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({});
      }
      const data = {
        customerId: customerId,
        ...body,
      };

      const response = await autoUploadInstructionsServices.instructionsDetailList({
        data,
        pageNumber: pageNumber || 1,
        pageSize: pageSize || 10,
      });

      dispatch(
        setFilterObject({
          body,
          pageNumber,
          pageSize,
        }),
      );

      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getInstructionsTempList = createAsyncThunk(
  'getInstructionsTempList',
  async ({ pageNumber, pageSize, showOnlyPriced }, { dispatch, rejectWithValue }) => {
    try {
      const response = await autoUploadInstructionsServices.instructionsTempList({
        pageNumber: pageNumber || 1,
        pageSize: pageSize || 10,
        showOnlyPriced,
      });

      dispatch(
        setFilterObject({
          pageNumber,
          pageSize,
        }),
      );

      return response;
    } catch (error) {
      return rejectWithValue();
    }
  },
);

export const getByInstruction = createAsyncThunk(
  'getByInstruction',
  async (id, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({});
      }

      const res = await autoUploadInstructionsServices.getById({
        customerId,
        id,
        vouId: 1,
      });

      return res;
    } catch (error) {
      return rejectWithValue({});
    }
  },
);

export const getInstructionsTemp = createAsyncThunk(
  'getInstructionsTemp',
  async (_, { rejectWithValue }) => {
    try {
      return await autoUploadInstructionsServices.getInstructionsTemp();
    } catch (error) {
      return rejectWithValue({});
    }
  },
);

export const instructionDelete = createAsyncThunk(
  'instructionDelete',
  async (body, { rejectWithValue }) => {
    try {
      return await autoUploadInstructionsServices.instructionDelete(body);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const instructionUpdate = createAsyncThunk(
  'instructionUpdate',
  async (body, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({});
      }

      const res = await autoUploadInstructionsServices.instructionUpdate({
        vouId: 1,
        segId: 1000,
        customerId: customerId,
        ...body,
      });

      return res;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const instructionAdd = createAsyncThunk(
  'instructionAdd',
  async (body, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({});
      }
      body.autoLoadingCreateRequestDto.customerId = customerId;
      body.autoLoadingCreateRequestDto.vouId = 1;
      body.autoLoadingCreateRequestDto.segId = 1000;

      const res = await autoUploadInstructionsServices.instructionAdd({
        ...body,
      });

      return res;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const instructionDetailPriceAdd = createAsyncThunk(
  'instructionDetailPriceAdd',
  async (body, { getState, dispatch, rejectWithValue }) => {
    try {
      const currentInstructionId = await getState()?.autoUploadInstructions.currentInstruction?.id;
      if (!currentInstructionId) {
        return rejectWithValue({
          message: 'Kayıt bulunamadı.',
        });
      }

      const res = await autoUploadInstructionsServices.instructionDetailAdd(body);
      await dispatch(getByInstruction(currentInstructionId));

      return res;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const instructionDetailPriceUpdate = createAsyncThunk(
  'instructionDetailPriceUpdate',
  async (body, { getState, dispatch, rejectWithValue }) => {
    try {
      const res = await autoUploadInstructionsServices.instructionDetailPriceUpdate(body);
      const { pageNumber, pageSize } = getState()?.autoUploadInstructions?.filterObject;
      await dispatch(getInstructionsTempList({ pageNumber, pageSize, showOnlyPriced: false }));
      await dispatch(getTotal());

      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.data);
    }
  },
);

export const instructionDetailExcelUpload = createAsyncThunk(
  'instructionDetailExcelUpload',
  async (body, { getState, dispatch, rejectWithValue }) => {
    try {
      const currentInstruction = await getState()?.autoUploadInstructions.currentInstruction;
      const currentInstructionId = currentInstruction.id;

      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }

      const data = new FormData();
      data.append('FormFile', body?.file, body?.fileName);
      data.append('CustomerId', customerId);
      data.append('ExcelUploadCheck.PeriodType', currentInstruction?.periodType);
      data.append('ExcelUploadCheck.FirstRowHeaderColumn', body?.firstRowHeader);
      data.append('ExcelUploadCheck.CardNumberColumn', body?.cardNumber);
      data.append('ExcelUploadCheck.RefNoColumn', body?.refNo);
      body?.dayCount && data.append('ExcelUploadCheck.DayCountColumn', body?.dayCount);
      data.append('ExcelUploadCheck.PriceColumn', body?.price);

      const res = await autoUploadInstructionsServices.instructionExcelUpload(data);
      await dispatch(getByInstruction(currentInstructionId));
      return res;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const instructionDetailExcelTemplate = createAsyncThunk(
  'instructionDetailExcelTemplate',
  async (body, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({
          message: 'Lütfen anasayfaya giderek müşteri tipi seçiniz.',
        });
      }

      const res = await autoUploadInstructionsServices.instructionExcelDownload({
        ...body,
        customerId,
      });

      return res;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getTotal = createAsyncThunk('getTotal', async (_, { rejectWithValue }) => {
  try {
    const res = await autoUploadInstructionsServices.getTotal();
    return res;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const instructionDetailCopy = createAsyncThunk(
  'instructionDetailCopy',
  async (body, { getState, rejectWithValue }) => {
    try {
      const customerId = await getState()?.customer?.selectedCustomer?.customerId;
      if (!customerId) {
        return rejectWithValue({});
      }

      body.customerId = customerId;
      body.vouId = 1;

      const res = await autoUploadInstructionsServices.instructionDetailCopy(body);

      return res;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const getInstructionSucceeded = (state, payload) => {
  try {
    let newPayload = {
      ...payload,
      periodType: payload?.periodType === 'Günlük' ? 1 : 2,
      confirmEveryMonth: payload?.confirmEveryMonth ? 1 : 0,
    };

    state.currentInstruction = newPayload;
  } catch (error) {
    console.log(error);
  }
};

const initialState = {
  selectedAutoUploadDetails: [],
  completedId: null,
  list: [],
  detailList: [],
  tempList: [],
  currentInstruction: {
    id: 0,
    periodType: 1,
    vouId: 1,
    segId: 1000,
    isActive: false,
    isStatus: false,
  },
  activeStep: 0,
  instructionType: 0,
  totalCount: 0,
  totalPrice: 0,
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
  filterObject: {
    body: {},
    pageNumber: 1,
    pageSize: 10,
  },
  detailTableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
  detailFilterObject: {
    body: {},
    pageNumber: 1,
    pageSize: 10,
  },
};

export const autoUploadInstructionsSlice = createSlice({
  name: 'autoUploadInstructions',
  initialState,
  reducers: {
    setFilterObject: (state, action) => {
      state.filterObject = action.payload;
    },
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    nextStep: (state) => {
      state.activeStep = state.activeStep + 1;
    },
    prevStep: (state) => {
      state.activeStep = state.activeStep - 1;
    },
    setInstructionType: (state, action) => {
      state.instructionType = action.payload;
    },
    setCurrentInstruction: (state, action) => {
      state.currentInstruction = {
        ...state.currentInstruction,
        ...action.payload,
      };
    },
    setSelecteAutoUploadDetails: (state, action) => {
      state.selectedAutoUploadDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getByInstruction.fulfilled, (state, action) => {
      getInstructionSucceeded(state, action?.payload?.data?.items[0]);
    });
    builder.addCase(getInstructionsPageList.fulfilled, (state, action) => {
      state.list = action?.payload?.data?.items || [];
      state.tableProperty = action?.payload?.data?.pagedProperty || initialState?.tableProperty;
    });
    builder.addCase(getInstructionsDetailsPageList.fulfilled, (state, action) => {
      state.detailList = action?.payload?.data?.items || [];
      state.detailTableProperty =
        action?.payload?.data?.pagedProperty || initialState?.tableProperty;
    });
    builder.addCase(getInstructionsTempList.fulfilled, (state, action) => {
      state.detailList = action?.payload?.data?.items || [];
      state.detailTableProperty =
        action?.payload?.data?.pagedProperty || initialState?.tableProperty;
    });
    builder.addCase(getTotal.fulfilled, (state, action) => {
      state.totalCount = action?.payload?.data?.totalCount;
      state.totalPrice = action?.payload?.data?.totalPrice;
    });
    builder.addCase(instructionAdd.fulfilled, (state, action) => {
      state.completedId = action?.payload?.data?.id;
    });
    builder.addCase(getInstructionsTemp.fulfilled, (state, action) => {
      const { data } = action.payload;

      state.currentInstruction.confirmEveryMonth = data?.confirmEveryMonth ? 1 : 0;
      state.currentInstruction.startDay = data?.startDay === 0 ? 1 : data?.startDay;
      state.totalCount = data?.totalCount;
      state.totalPrice = data?.totalPrice;
    });
    builder.addCase(instructionDetailCopy.fulfilled, (state, action) => {
      const { data } = action.payload;

      state.currentInstruction.confirmEveryMonth = data?.confirmEveryMonth ? 1 : 0;
      state.currentInstruction.startDay = data?.startDay === 0 ? 1 : data?.startDay;
      state.currentInstruction.id = 0;
    });
  },
});

export const {
  setFilterObject,
  nextStep,
  setInstructionType,
  setCurrentInstruction,
  prevStep,
  setActiveStep,
  setSelecteAutoUploadDetails,
} = autoUploadInstructionsSlice.actions;
