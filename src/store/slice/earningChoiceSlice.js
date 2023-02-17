import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  earningChoice: [],
  lessonIds: [],
};

export const earningChoiceSlice = createSlice({
  name: 'earningChoiceSlice',
  initialState,
  reducers: {
    setEarningChoice: (state, action) => {
      state.earningChoice = action.payload;
    },
    setLessonIds: (state, action) => {
      state.lessonIds = action.payload;
    },
  

  },
});

export const { setEarningChoice,setLessonIds } = earningChoiceSlice.actions;
