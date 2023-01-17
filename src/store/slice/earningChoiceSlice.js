import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  earningChoice: [],
  expandedEarningChoice: [],
};

export const earningChoiceSlice = createSlice({
  name: 'earningChoiceSlice',
  initialState,
  reducers: {
    setEarningChoice: (state, action) => {
      state.earningChoice = action.payload;
    },
    setExpandedEarningChoice: (state, action) => {
      state.expandedEarningChoice = action.payload;
    },
  },
});

export const { setEarningChoice, setExpandedEarningChoice } = earningChoiceSlice.actions;
