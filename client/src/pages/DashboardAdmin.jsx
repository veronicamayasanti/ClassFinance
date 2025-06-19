import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Mengimpor useNavigate untuk navigasi
import { getAllUsers } from '../api';


const DashboardPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
    const [totalPages, setTotalPages] = useState(0); // Total halaman
    const [showUsers, setShowUsers] = useState(false);
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

    const fetchUsers = async () => {
        try {
            const result = await getAllUsers(); // Mendapatkan semua pengguna
            setUsers(result.users); // Ambil pengguna dari result.users
        } catch (err) {
            setError(err.message);
            console.error("Error fetching users:", err);
        }
    };

    const handleShowUsers = () => {
        fetchUsers(); // Panggil function untuk mengambil data
        setShowUsers(true); // Set state untuk menunjukkan tabel
    };

    useEffect(() => {
        // Fetch users hanya jika tombol ditekan
        if (showUsers) {
            fetchUsers();
        }
    }, [showUsers]);

    return (
        <div className="flex min-h-screen">
            <div className="w-1/4 bg-gray-800 text-white p-5">
                <h2 className="text-2xl font-bold mb-4">SDN Cileles</h2>
                <ul className="space-y-2">
                    <li>
                        <button onClick={handleLogout} className="w-full text-left bg-red-600 hover:bg-red-500 px-4 py-2 rounded">
                            Logout
                        </button>
                    </li>
                    {/* Tombol untuk menampilkan semua data pengguna */}
                    <li>
                        <button onClick={handleShowUsers} className="w-full text-left bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">
                            Tampilkan Semua Pengguna
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-10 bg-gray-100">
                <h1 className="text-3xl font-semibold mb-4">Selamat datang, {userName}!</h1>
                <p>Ini adalah halaman dashboard. Anda telah login dengan sukses.</p>

                {/* Tampilkan tabel pengguna jika showUsers true */}
                {showUsers && (
                    <div className="mt-5">
                        {error && <p className="text-red-500">{error}</p>}
                        {users.length > 0 ? (
                            <table className="min-w-full border border-gray-300">
                                <thead>
                                <tr>
                                    <th className="border-b p-2 text-left">Nama</th>
                                    <th className="border-b p-2 text-left">Nomor Telepon</th>
                                    <th className="border-b p-2 text-left">Email</th>
                                    <th className="border-b p-2 text-left">Grade ID</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="border-b p-2">{user.name}</td>
                                        <td className="border-b p-2">{user.phone_number}</td>
                                        <td className="border-b p-2">{user.email}</td>
                                        <td className="border-b p-2">{user.grade_id}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Tidak ada pengguna yang ditemukan.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;