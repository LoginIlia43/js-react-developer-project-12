import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from './routes/PageNotFound';
import Login from './routes/Login';
import Main from './routes/Main';
import './App.css';

function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path='/' element={<Main />} />
        <Route path="/login" element={<Login />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;
