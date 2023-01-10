import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  activeKey: '0',
};

export const workPlanSlice = createSlice({
  name: 'workPlanSlice',
  initialState,
  reducers: {
    onChangeActiveKey: (state, action) => {
      state.activeKey = action?.payload;
    },
  },
  extraReducers: (builder) => {

  },
});

export const {
  onChangeActiveKey,
} = workPlanSlice.actions;
