import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import manageCardsServices from '../../services/manageMyCards.services';

export const cardGetPagedList = createAsyncThunk(
  'cardGetPagedList',
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

      const response = await manageCardsServices.cardGetPagedList({
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

export const processTypesGetPagedList = createAsyncThunk(
  'processTypesGetPagedList',
  async (body, { getState, rejectWithValue }) => {
    try {
      const statusId = await getState()?.manageMyCards?.filterObject?.body?.statusId;

      return await manageCardsServices.processTypesGetPagedList({
        type: statusId !== null ? statusId : undefined,
      });
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const cardsCancelList = createAsyncThunk(
  'cardsCancelList',
  async (body, { getState, rejectWithValue, dispatch }) => {
    try {
      const selectedCards = await getState()?.manageMyCards?.selectedCards;
      const data = {
        requestDtos: selectedCards.map((item) => {
          return {
            cardNumber: item?.cardNumber,
            id: body?.id,
          };
        }),
      };
      //cardNumber: selectedCards.map(item => item.cardNumber),
      //...body,
      dispatch(cardGetPagedList(getState()?.manageMyCards?.filterObject));
      return await manageCardsServices.cardsCancelList(data);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const employeesUpdateList = createAsyncThunk(
  'employeesUpdateList',
  async (body, { rejectWithValue }) => {
    try {
      return await manageCardsServices.employeesUpdateList(body);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const cancelRequestsDelete = createAsyncThunk(
  'cancelRequestsDelete',
  async (body, { rejectWithValue }) => {
    try {
      return await manageCardsServices.cancelRequestsDelete(body);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

const initialState = {
  list: [],
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
  selectedCards: [],
};

export const manageMyCardsSlice = createSlice({
  name: 'manageMyCards',
  initialState,
  reducers: {
    setFilterObject: (state, action) => {
      state.filterObject = action.payload;
    },
    setSelectedCards: (state, action) => {
      state.selectedCards = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cardGetPagedList.fulfilled, (state, action) => {
      state.list = action?.payload?.data?.items || [];
      state.tableProperty = action?.payload?.data?.pagedProperty || initialState?.tableProperty;
    });
    builder.addCase(cardGetPagedList.rejected, (state) => {
      state.list = initialState.list;
      state.tableProperty = initialState?.tableProperty;
    });
  },
});

export const { setFilterObject, setSelectedCards } = manageMyCardsSlice.actions;
