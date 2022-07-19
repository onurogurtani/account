import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedKey: [],
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    menuChange: (state, action) => {
      state.selectedKey = action.payload;
    },
  },
});

export const { menuChange } = menuSlice.actions;
