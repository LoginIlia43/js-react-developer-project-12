/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: {},
  ids: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      const normalizedChannels = {};
      const ids = [];

      payload.forEach(({
        id, name, removable, author = 'auto',
      }) => {
        normalizedChannels[id] = {
          id,
          name,
          removable,
          author,
        };
        ids.push(id);
      });
      state.entities = normalizedChannels;
      state.ids = ids;
    },
    renameChannel: (state, { payload }) => {
      const { id, name, removable } = payload;
      state.entities[id] = {
        id,
        name,
        removable,
      };
    },
    newChannel: (state, { payload }) => {
      const {
        id, name, removable, author,
      } = payload;
      state.entities[id] = {
        id,
        name,
        removable,
        author,
      };
      state.ids.push(id);
    },
    removeChannel: (state, { payload }) => {
      const normalizedChannels = {};
      const channelId = payload.id;
      Object.values(state.entities)
        .filter(({ id }) => id !== channelId)
        .forEach(({ id, name, removable }) => {
          normalizedChannels[id] = {
            id,
            name,
            removable,
          };
        });
      state.entities = normalizedChannels;
      state.ids = state.ids.filter((id) => channelId !== id);
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
