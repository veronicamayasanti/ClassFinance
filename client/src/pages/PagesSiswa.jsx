import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./Layout.jsx";
import LoginSiswa from '../component/users/LoginSiswa';
import RegisterSiswa from '../component/users/RegisterSiswa';
import HalamanSiswa from '../component/users/HalamanSiswa';
import Home from "./Home.jsx";
import ProfileSiswa from "../component/users/ProfileSiswa.jsx";

function PagesSiswa() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginSiswa />} />
          <Route path="/register" element={<RegisterSiswa />} />
          <Route path="/halamansiswa" element={<HalamanSiswa />} />
          <Route path="/halamansiswa/profile" element={<ProfileSiswa />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default PagesSiswa;