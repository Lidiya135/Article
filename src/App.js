// import logo from './logo.svg';
import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Daftar from './pages/Daftar';
import Tambah from './pages/Tambah';
import Ubah from './pages/Ubah';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import Card from './components/card';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="daftar" />} replace="true" />
        <Route path="/daftar" element={<Daftar />} />
        <Route path="/tambah" element={<Tambah />} />
        <Route path="/ubah/:id" element={<Ubah />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/card" element={<Card />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
