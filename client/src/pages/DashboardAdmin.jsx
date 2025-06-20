import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../api';


const DashboardPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [showUsers, setShowUsers] = useState(false);
    const navigate = useNavigate();

    const userName = localStorage.getItem('userName') || 'User'; // Default to 'User' if name is not found

    const handleLogout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userRoleId');
        localStorage.removeItem('userGradeId');
        navigate('/login');
    };

    const fetchUsers = async (page) => {
        try {
            const result = await getAllUsers(page);
            console.log(result)
            setUsers(result.users);
            setTotalPages(result.totalPages);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching users:", err);
        }
    };

    const handleShowUsers = () => {
        fetchUsers(currentPage); // Panggil function untuk mengambil data
        setShowUsers(true); // Set state untuk menunjukkan tabel
    };

    useEffect(() => {
        if (showUsers) {
            fetchUsers(currentPage);
        }
    }, [currentPage, showUsers]);

    const changePage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        fetchUsers(page);
    };

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

                    <li>
                        <button onClick={handleShowUsers} className="w-full text-left bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">
                            Tampilkan Semua Pengguna
                        </button>
                    </li>
                </ul>
            </div>

            <div className="flex-1 p-10 bg-gray-100">
                <h1 className="text-3xl font-semibold mb-4">Selamat datang, {userName}!</h1>

                {showUsers && (
                    <div className="mt-5">
                        {error && <p className="text-red-500">{error}</p>}
                        {users.length > 0 ? (
                            <div>
                                <h4 className="text-3xl font-semibold mb-4"> semua user </h4>
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

                                {/* Pagination */}
                                <div className="mt-4 flex justify-center">
                                    {currentPage > 1 && (
                                        <button
                                            onClick={() => changePage(currentPage - 1)}
                                            className="px-4 py-2 bg-gray-300 rounded-l-md hover:bg-gray-400"
                                        >
                                            &#60; Previous
                                        </button>
                                    )}
                                    <span className="px-3 py-2">{currentPage}</span>
                                    {currentPage < totalPages && (
                                        <button
                                            onClick={() => changePage(currentPage + 1)}
                                            className="px-4 py-2 bg-gray-300 rounded-r-md hover:bg-gray-400"
                                        >
                                            Next &#62;
                                        </button>
                                    )}
                                </div>
                            </div>
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