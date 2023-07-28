import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from "./channelsSlice.jsx";

const store = configureStore({
    reducer: {
        channels: channelsReducer,
    },
});

export default store;