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
                state.entities = normalizedChannels;
                state.ids = ids;
            },
    },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
