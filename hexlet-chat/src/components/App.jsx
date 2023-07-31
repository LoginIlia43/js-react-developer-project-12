import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './AuthProvider';
import { useDispatch } from 'react-redux';
import axios from "axios";

import LoginPage from '../routes/LoginPage';
import MainPage from '../routes/MainPage';
import NotFoundPage from '../routes/NotFoundPage';

import socket from '../socket.js';

import { actions as channelsActions } from "../slices/channelsSlice";
import { actions as messagesActions } from "../slices/messagesSlice";
import { actions as currentChannelIdActions } from "../slices/channelIdSlice";

function App() {
  
  const dispatch = useDispatch();

socket.on('newMessage', (message) => {
  dispatch(messagesActions.addMessage(message));
});

socket.on("connect_error", (err) => {
  console.log(`Socket connect_error due to ${err.message}`);
})


  const fetchData = async () => {
    const token = localStorage.getItem("userToken");
    const { data } = await axios.get("/api/v1/data", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .catch((e) => console.log(e));

    dispatch(channelsActions.setChannels(data.channels));
    dispatch(messagesActions.setMessages(data.messages));
    dispatch(currentChannelIdActions.setCurrentChannelId(data.currentChannelId));
};

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path='/' element={<MainPage fetchData={fetchData} />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
