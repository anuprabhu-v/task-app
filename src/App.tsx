import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TableScreen from './pages/TableScreen';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={TableScreen} />
      </Routes>
    </BrowserRouter>
  );
}