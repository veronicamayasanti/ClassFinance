import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { getAllUsers, updateUserApi, deleteUser, registerUser } from '../api';
import Pagination from "./Pagination.jsx";

function DashboardOperator() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [showUsers, setShowUsers] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [limit, setLimit] = useState(2);

    const userName = localStorage.getItem('userName');
    const gradeId = localStorage.getItem('userGradeId')
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userRoleId');
        localStorage.removeItem('userGradeId');
        navigate('/');
    };

    const fetchUsers = async (page, searchTerm) => {

        console.log("Fetching users for page:", page, "searchTerm:", searchTerm, "Grade ID:", gradeId); // Log for debugging

        try {
            const result = await getAllUsers(page, limit, searchTerm,null,  gradeId );
            console.log("API Response:", result); // Log the API response
            setUsers(result.users);
            setTotalPages(result.totalPages);
        } catch (err) {
            console.error("Fetch error:", err); // Log any errors
            setError(err.message);
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

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setCurrentPage(1); // Set currentPage ke 1 saat pencarian diubah
        fetchUsers(1, value);
    };

    const changePage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        fetchUsers(page, searchTerm);
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/4 bg-gray-800 text-white p-5">
                <h2 className="text-2xl font-bold mb-4">Laporan Kas kelas {gradeId} SDN Cileles</h2>
                <ul className="space-y-2">
                    <li>
                        <button onClick={handleShowUsers} className="w-full text-left bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">
                            All Students Grade {gradeId}
                        </button>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="w-full text-left bg-red-600 hover:bg-red-500 px-4 py-2 rounded">
                            Logout
                        </button>
                    </li>
                </ul>
            </div>

            <div className="flex-1 p-10 bg-gray-100">
                <h1 className="text-3xl font-semibold mb-4">Selamat datang siswa, {userName} !</h1>
                {showUsers && (
                    <div className="mt-5">
                        {error && <p className="text-red-500">{error}</p>}
                        <div>
                            <h4 className="text-3xl font-semibold mb-4"> Daftar Siswa kelas {gradeId} </h4>
                            <div className="mb-5 flex items-center space-x-4">
                                <input
                                    type="text"
                                    placeholder="Search by name"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="flex-1 max-w-xs rounded-md bg-white px-2 py-1 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm border-2"
                                />

                                <label className="block text-sm font-medium text-gray-900 mb-1">entries per page:</label>
                                <select
                                    value={limit}
                                    onChange={(e) => {
                                        setLimit(Number(e.target.value));
                                        setCurrentPage(1);
                                        fetchUsers(1, searchTerm);
                                    }}
                                    className="rounded-md bg-white px-2 py-1 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm border-2"
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
                                    <th className="border-b p-2 text-left">Grade ID</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="border-b p-2">{user.name}</td>
                                            <td className="border-b p-2">{user.phone_number}</td>
                                            <td className="border-b p-2">{user.grade_id}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="border-b p-2 text-center">Tidak ada pengguna yang
                                            ditemukan.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={changePage}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardOperator;