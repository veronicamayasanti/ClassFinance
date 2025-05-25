import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HalamanSiswa() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil username dari localStorage setelah login
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      navigate('/login');  // Jika tidak ada username, arahkan ke halaman login
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('username'); // Hapus username dari localStorage
    navigate('/'); // Arahkan kembali ke halaman home
  };

  const handleProfile = () => {
    navigate('/halamansiswa/profile'); // Arahkan ke halaman profil siswa
  };

  return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">Selamat Datang, {username}!</h1>
          <div>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
            <button
                onClick={handleProfile}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 ml-2">
              Profil
            </button>
          </div>
        </header>
        <main className="flex-grow flex items-center justify-center mt-0">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Kas Kelas 1B SDN Cileles</h2>
            {/* Konten tambahan bisa ditambahkan di sini */}
          </div>
        </main>
      </div>
  );
}

export default HalamanSiswa;