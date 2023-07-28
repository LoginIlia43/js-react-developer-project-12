import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentChannelId: null,
}

const channelIdSlice = createSlice({
    name: "currentChannelId",
    initialState,
    reducers: {
        setCurrentChannelId:
            (state, { payload }) => {
                state.currentChannelId = payload;
            },
    },
});

export const { actions } = channelIdSlice;
export default channelIdSlice.reducer;
