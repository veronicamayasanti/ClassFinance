import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../api';


const DashboardPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [showUsers, setShowUsers] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [limit, setLimit] = useState(2);
    const navigate = useNavigate();

    const userName = localStorage.getItem('userName') || 'User'; // Default to 'User' if name is not found

    const handleLogout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userRoleId');
        localStorage.removeItem('userGradeId');
        navigate('/login');
    };

    const fetchUsers = async (page, searchTerm) => {
        console.log("Fetching users for page:", page, "with searchTerm:", searchTerm, "limit", limit);
        try {
            const result = await getAllUsers(page,limit, searchTerm );
            setUsers(result.users);
            setTotalPages(result.totalPages);
            console.log(result)
        } catch (err) {
            setError(err.message);
            console.error("Error fetching users:", err);
        }
    };

    const handleShowUsers = () => {
        fetchUsers(currentPage, searchTerm);
        setShowUsers(true);
    };

    useEffect(() => {
        if (showUsers) {
            fetchUsers(currentPage, searchTerm);
        }
    }, [currentPage, showUsers, searchTerm, limit]);

    // Fungsi untuk menangani perubahan input pencarian
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setCurrentPage(1); // Set currentPage ke 1 saat pencarian diubah

        // Ambil pengguna sesuai dengan nilai pencarian
        fetchUsers(1, value); // Panggil fungsi fetching dengan page 1
    };


    const changePage = (page) => {
        if (page < 1 || page > totalPages) return; // Validasi halaman
        setCurrentPage(page);
        fetchUsers(page, searchTerm); // Ambil pengguna sesuai dengan halaman dan searchTerm
    };

    const renderPagination = () => {
        const pages = [];

        const startPage = Math.max(1, currentPage - 2); // Halaman awal (2 halaman sebelum)
        const endPage = Math.min(totalPages, currentPage + 2); // Halaman akhir (2 halaman setelah)

        if (startPage > 1) {
            pages.push(1); // Halaman pertama
            if (startPage > 2) pages.push('...'); // Ellipsis jika ada halaman di antara
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pages.push('...'); // Ellipsis jika ada halaman di antara
            pages.push(totalPages); // Halaman terakhir
        }
        return (
            <div className="mt-4 flex justify-center">
                {pages.map((page, index) => (
                    <button
                        key={index}
                        onClick={() => changePage(page)}
                        className={`px-4 py-2 ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-300'} rounded-md hover:bg-gray-400`}
                        disabled={page === '...' || (page === currentPage)}
                    >
                        {page}
                    </button>
                ))}
            </div>
        );
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
                        <div>
                            <h4 className="text-3xl font-semibold mb-4"> Semuanya Pengguna </h4>
                            <div className="mb-5">
                                <input
                                    type="text"
                                    placeholder="Search by name"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-5 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>

                            {/* Form select untuk menentukan jumlah data yang ditampilkan */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-900 mb-1">Tampilkan:</label>
                                <select
                                    value={limit}
                                    onChange={(e) => {
                                        setLimit(Number(e.target.value));
                                        setCurrentPage(1); // Reset halaman ke 1 ketika limit diubah
                                        fetchUsers(1, searchTerm); // Ambil data baru sesuai limit
                                    }}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option value={2}>2</option>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                </select>
                            </div>

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
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="border-b p-2">{user.name}</td>
                                            <td className="border-b p-2">{user.phone_number}</td>
                                            <td className="border-b p-2">{user.email}</td>
                                            <td className="border-b p-2">{user.grade_id}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="border-b p-2 text-center">Tidak ada pengguna yang ditemukan.</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            {renderPagination()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;