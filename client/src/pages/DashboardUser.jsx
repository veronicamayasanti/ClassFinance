import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { getAllUsers, updateUserApi, getUserById  } from '../api';
import Pagination from "./Pagination.jsx";

function DashboardUser() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [showUsers, setShowUsers] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [limit, setLimit] = useState(2);
    const [userProfile, setUserProfile] = useState(null);

    const userName = localStorage.getItem('userName');
    const gradeId = localStorage.getItem('userGradeId')
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userRoleId');
        localStorage.removeItem('userGradeId');
        localStorage.removeItem('userId');
        navigate('/');
    };


    const fetchProfile = async () => {
        try {
            const userData = await getUserById(userId);
            setUserProfile((prevProfile) => (prevProfile ? null : userData)); // Toggle the profile visibility
            setShowUsers(false);
        } catch (err) {
            setError("could not fetch profile data.")
        }
    }


    const handleShowUsers = async () => {
        if (showUsers) {
            // If already showing users, clear the user profile and set showUsers to false
            setUserProfile(null);
            setShowUsers(false);
        } else {
            // Show users
            await fetchUsers(currentPage, searchTerm);
            setShowUsers(true);
            setUserProfile(null); // Clear profile when viewing users
        }
    };

    const fetchUsers = async (page, searchTerm) => {
        try {
            const result = await getAllUsers(page, limit, searchTerm,null,  gradeId );
            setUsers(result.users);
            setTotalPages(result.totalPages);
        } catch (err) {
            setError(err.message);
        }
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
                        <button onClick={fetchProfile} className="w-full text-left bg-green-600 hover:bg-green-500 px-4 py-2 rounded">
                            My Profile
                        </button>
                    </li>
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

                {error && <p className="text-red-500">{error}</p>}

                {userProfile ? (
                    <div className="bg-white p-5 rounded shadow-md w-xs">
                        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
                        <p className="flex justify-between">
                            <span>Full Name :</span>
                            <span>{userProfile.name}</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Email Address: </span>
                            <span>{userProfile.email}</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Phone Number :</span>
                            <span>{userProfile.phone_number}</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Grade :</span>
                            <span>{userProfile.grade_id}</span>
                        </p>
                    </div>
                ) :  showUsers && (
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

export default DashboardUser;