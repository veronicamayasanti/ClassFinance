import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Ubah di sini

import RegisterPage from './pages/RegisterPage.jsx';


function App() {
    return (
        <Router>
            <div className="App">
                <Routes> {/* Menggunakan <Routes> menggantikan <Switch> */}

                    <Route path="/register" element={<RegisterPage />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;