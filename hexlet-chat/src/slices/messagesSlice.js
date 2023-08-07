import { createSlice } from "@reduxjs/toolkit";
import { actions as channelsActions } from "./channelsSlice";

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
                state.ids.push(id);
            },
    },
    extraReducers: (builder) => {
        builder.addCase(channelsActions.removeChannel, (state, { payload }) => {
            const normalizedMessages = {};
            const { id } = payload;

            Object.values(state.entities)
                .filter(({ channelId }) => id !== channelId)
                .forEach(({id, message, username, channelId }) => {
                    normalizedMessages[id] = {
                        id,
                        message,
                        username,
                        channelId,
                    };
                })
            state.entities = normalizedMessages;
            console.log(state.entities)
            state.ids = Object.keys(state.entities).map(key => Number(key));
        });
    }
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
