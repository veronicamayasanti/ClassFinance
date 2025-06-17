import React from 'react';
import { useNavigate } from 'react-router-dom'; // Mengimpor useNavigate untuk navigasi

const DashboardPage = () => {
    const navigate = useNavigate();

    // Ambil nama dari localStorage
    const userName = localStorage.getItem('userName') || 'User'; // Default to 'User' if name is not found

    // Fungsi untuk menangani logout
    const handleLogout = () => {
        // Bersihkan localStorage
        localStorage.removeItem('userName');
        localStorage.removeItem('userRoleId');
        localStorage.removeItem('userGradeId');

        // Arahkan pengguna ke halaman login setelah logout
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/4 bg-gray-800 text-white p-5">
                <h2 className="text-2xl font-bold mb-4">Sidebar</h2>
                <ul className="space-y-2">
                    <li>
                        <button onClick={handleLogout} className="w-full text-left bg-red-600 hover:bg-red-500 px-4 py-2 rounded">
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-10 bg-gray-100">
                <h1 className="text-3xl font-semibold mb-4">Selamat datang, {userName}!</h1>
                <p>Ini adalah halaman dashboard. Anda telah login dengan sukses.</p>
                {/* Tambahkan konten tambahan di sini, seperti grafik atau informasi lainnya */}
            </div>
        </div>
    );
};

export default DashboardPage;