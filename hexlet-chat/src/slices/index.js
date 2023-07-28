import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from "./channelsSlice.js";
import messagesReducer from "./messagesSlice.js";
import currentChannelIdReducer from "./channelIdSlice.js";

const store = configureStore({
    reducer: {
        channels: channelsReducer,
        messages: messagesReducer,
        currentChannelId: currentChannelIdReducer,
    },
});

export default store;
