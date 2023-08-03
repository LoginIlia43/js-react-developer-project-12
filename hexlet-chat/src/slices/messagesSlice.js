import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    entities: {},
    ids: [],
};

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessages:
            (state, { payload }) => {
                const normalizedMessages = {};
                const ids = [];

                payload.forEach(({ message, username, channelId, id }) => {
                    normalizedMessages[id] = {
                        id,
                        message,
                        username,
                        channelId,
                    };
                    ids.push(id);
                });
                state.entities = normalizedMessages;
                state.ids = ids;
                console.log(state.entities);
            },
        addMessage:
            (state, { payload }) => {
                const { id, message, username, channelId } = payload;
                state.entities[id] = {
                    id,
                    message,
                    username,
                    channelId,
                };
            },
    },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
