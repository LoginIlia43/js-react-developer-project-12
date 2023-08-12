import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShow: false,
  type: '',
  channelId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setType:
            (state, { payload }) => {
              state.type = payload;
            },
    setId:
            (state, { payload }) => {
              state.channelId = payload;
            },
    toggleIsShow:
            (state) => {
              state.isShow = !state.isShow;
            },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
