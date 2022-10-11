import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import videoServices from '../../services/video.services';

const initialState = {
  activeKey: '0',
  values: {},
};

export const videoSlice = createSlice({
  name: 'videoSlice',
  initialState,
  reducers: {
    onChangeActiveKey: (state, action) => {
      state.activeKey = action?.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(getAllImages.fulfilled, (state, action) => {
  //       state.images = action?.payload?.data?.items;
  //     });
  //   },
});

export const { onChangeActiveKey } = videoSlice.actions;
