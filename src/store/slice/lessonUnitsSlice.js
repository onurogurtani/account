import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import lessonUnitsServices from '../../services/lessonUnits.services.js';

const initialState = {
  lessonUnits: [],
};

export const lessonUnitsSlice = createSlice({
  name: 'lessonUnitsSlice',
  initialState,
  reducers: {
    resetLessonUnits: (state, action) => {
      state.lessonUnits = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUnits.fulfilled, (state, action) => {
      if (action?.payload?.data?.items.length) {
        state.lessonUnits = state.lessonUnits.concat(action?.payload?.data?.items);
      }
    });
    builder.addCase(addUnits.fulfilled, (state, action) => {
      state.lessonUnits = state.lessonUnits.concat(action?.payload?.data);
    });
    builder.addCase(editUnits.fulfilled, (state, action) => {
      const {
        arg: {
          entity: { id },
        },
      } = action.meta;
      if (id) {
        state.lessonUnits = [action?.payload?.data, ...state.lessonUnits.filter((item) => item.id !== id)];
      }
    });
    builder.addCase(deleteUnits.fulfilled, (state, action) => {
      const { arg } = action.meta;
      if (arg) {
        state.lessonUnits = state.lessonUnits.filter((item) => item.id !== arg);
      }
    });
  },
});

export const { resetLessonUnits } = lessonUnitsSlice.actions;

export const getUnits = createAsyncThunk('getUnits', async (body, { dispatch, getState, rejectWithValue }) => {
  try {
    //statede varsa request iptal
    const findUnits = getState()?.lessonUnits.lessonUnits.find((i) => i.lessonId === body[0]?.value);
    if (findUnits) return rejectWithValue();

    return await lessonUnitsServices.getUnits(body);
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const addUnits = createAsyncThunk('addUnits', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await lessonUnitsServices.addUnits(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const editUnits = createAsyncThunk('editUnits', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await lessonUnitsServices.editUnits(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const deleteUnits = createAsyncThunk('deleteUnits', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await lessonUnitsServices.deleteUnits(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
