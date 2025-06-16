import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Ubah di sini

import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from "./pages/DashboardPage.jsx";


function App() {
    return (
        <Router>
            <div className="App">
                <Routes> {/* Menggunakan <Routes> menggantikan <Switch> */}

                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;