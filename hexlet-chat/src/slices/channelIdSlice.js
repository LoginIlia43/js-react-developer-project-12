import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

const initialState = {
  currentChannelId: 1,
};

const channelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState,
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.newChannel, (state, { payload }) => {
      const { id, author } = payload;
      if (author === localStorage.getItem('username')) {
        state.currentChannelId = id;
      }
    });
    builder.addCase(channelsActions.removeChannel, (state, { payload }) => {
      const { id } = payload;
      if (state.currentChannelId === id) {
        state.currentChannelId = 1;
      }
    });
  },
});

export const { actions } = channelIdSlice;
export default channelIdSlice.reducer;
