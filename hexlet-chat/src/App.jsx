import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from './routes/PageNotFound';
import Login from './routes/Login';
import Main from './routes/Main';
import './App.css';
import AuthProvider from './components/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path='/' element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
