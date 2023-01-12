import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  earningChoice: [],
};

export const earningChoiceSlice = createSlice({
  name: 'earningChoiceSlice',
  initialState,
  reducers: {
    setEarningChoice : (state, action) => {
        state.earningChoice = action.payload;
      },
  },
});
