/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mainPageState: 'chat',
};

const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState,
  reducers: {
    setState: (state, { payload }) => {
      state.mainPageState = payload;
    },
  },
});

export const { actions } = mainPageSlice;
export default mainPageSlice.reducer;
