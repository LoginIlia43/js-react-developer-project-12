import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from "./channelsSlice.js";
import messagesReducer from "./messagesSlice.js";
import currentChannelIdReducer from "./channelIdSlice.js";
import mainPageReducer from "./mainPageSlice.js";
import modalReducer from "./modalSlice.js";

const store = configureStore({
    reducer: {
        channels: channelsReducer,
        messages: messagesReducer,
        currentChannelId: currentChannelIdReducer,
        mainPage: mainPageReducer,
        modal: modalReducer,
    },
});

export default store;
