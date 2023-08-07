import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    entities: {},
    ids: [],
};

const channelsSlice = createSlice({
    name: "channels",
    initialState,
    reducers: {
        setChannels:
            (state, { payload }) => {
                const normalizedChannels = {};
                const ids = [];

                payload.forEach(({ id, name, removable }) => {
                    normalizedChannels[id] = {
                        id,
                        name,
                        removable,
                    };
                    ids.push(id);
                });
                console.log(normalizedChannels[1])
                state.entities = normalizedChannels;
                state.ids = ids;
            },
        renameChannel:
            (state, { payload }) => {
                const { id, name, removable } = payload;
                state.entities[id] = {
                    id,
                    name,
                    removable,
                };
            },
        newChannel:
            (state, { payload }) => {
                const { id, name, removable } = payload;
                state.entities[id] = {
                    id,
                    name,
                    removable,
                };
            },
    },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
