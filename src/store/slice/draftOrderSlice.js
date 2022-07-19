import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  draftType: 0,
};

export const draftOrderSlice = createSlice({
  name: 'draftOrder',
  initialState,
  reducers: {
    setDraftType: (state, action) => {
      state.draftType = action.payload;
    },
  },
});

export const { setDraftType } = draftOrderSlice.actions;
