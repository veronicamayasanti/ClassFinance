import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, updateUserApi, deleteUser, registerUser } from '../api';
import UpdateModal from "./UpdateModal.jsx";
import DeleteModal from "./DeleteModal.jsx";
import AddUserModal from "./AddUserModal.jsx";
import ToastSuccessUpdate from "./ToastSuccessUpdate.jsx";
import ToastSuccessDelete from "./ToastSuccessDelete.jsx";

const DashboardPageAdmin = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [showUsers, setShowUsers] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [limit, setLimit] = useState(2);
    const [selectedUser, setSelectedUser] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const [toastVisible, setToastVisible] = useState(false);
    const [toastVisibleDelete, setToastVisibleDelete] = useState(false);

    const [roleIdFilter, setRoleIdFilter] = useState(null);
    const [gradeIdFilter, setGradeIdFilter] = useState(null);

    const navigate = useNavigate();
    const userName = localStorage.getItem('userName') || 'User';

    const handleLogout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userRoleId');
        localStorage.removeItem('userGradeId');
        navigate('/login');
    };

    const fetchUsers = async (page, searchTerm, roleId = null, gradeId = null) => {
        try {
            const result = await getAllUsers(page, limit, searchTerm, roleId, gradeId );
            setUsers(result.users);
            setTotalPages(result.totalPages);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleShowUsers = () => {
        fetchUsers(currentPage, searchTerm, roleIdFilter, gradeIdFilter);
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

    const handleUpdateUser = async (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleShowToast = () => {
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false); // Hide toast after 3 seconds
        }, 3000);
    };

    const updateUser = async (userId, userData) => {
        try {
            await updateUserApi(userId, userData);
            fetchUsers(currentPage, searchTerm);
            closeModal();
            handleShowToast()
            setTimeout(() => {
                setToastVisible(false); // Hide toast after 3 seconds
            }, 3000);
        } catch (error) {
            setError('Error updating user: ' + error.message);
        }
    };

    const handleAddUser = async (userData) => {
        try {
            await registerUser(userData);
            fetchUsers(currentPage, searchTerm);
            setIsAddUserModalOpen(false);
        } catch (error) {
            setError('Error adding user: ' + error.message);
        }
    };

    const handleShowToastDelete = () => {
        setToastVisibleDelete(true);
        setTimeout(() => {
            setToastVisibleDelete(false); // Hide toast after 3 seconds
        }, 3000);
    };

    const confirmDeleteUser = (id) => {
        setUserToDelete(id); // Store user ID to delete
        setIsDeleteModalOpen(true); // Open delete modal
    };

    const handleDeleteUser = async () => {
        if (userToDelete) {
            try {
                await deleteUser(userToDelete); // Delete user by ID
                fetchUsers(currentPage, searchTerm); // Refresh data after delete
                setIsDeleteModalOpen(false); // Close modal
                handleShowToastDelete()
            } catch (error) {
                setError('Error deleting user: ' + error.message);
            }
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/4 bg-gray-800 text-white p-5">
                <h2 className="text-2xl font-bold mb-4">Laporan Kas kelas SDN Cileles</h2>
                <ul className="space-y-2">
                    <li>
                        <button onClick={handleShowUsers} className="w-full text-left bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">
                            Tampilkan Semua Pengguna
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
                <h1 className="text-3xl font-semibold mb-4">Selamat datang, {userName}!</h1>
                {showUsers && (
                    <div className="mt-5">
                        {error && <p className="text-red-500">{error}</p>}
                        <div>
                            <h4 className="text-3xl font-semibold mb-4"> All User </h4>
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

                                {/* Filters for Role and Grade */}
                                <div className="mb-5 flex items-center space-x-4">
                                    <select
                                        value={roleIdFilter}
                                        onChange={(e) => setRoleIdFilter(e.target.value)}
                                        className="rounded-md bg-white px-2 py-1 text-base text-gray-900 border"
                                    >
                                        <option value="">All Roles</option>
                                        {/* Assuming roleId 2 corresponds to some role */}
                                        <option value={2}>Korlas SD Cileles</option>

                                        {/* Add more roles as needed */}
                                    </select>

                                    <select
                                        value={gradeIdFilter}
                                        onChange={(e) => setGradeIdFilter(Number(e.target.value))}
                                        className="rounded-md bg-white px-2 py-1 text-base text-gray-900 border"
                                    >
                                        <option value="">All Grades</option>
                                        {[1, 2, 3, 4, 5, 6].map((id) => (
                                            <option key={id} value={id}>Grade {id}</option>
                                        ))}
                                    </select>

                                    <button
                                        onClick={handleShowUsers}
                                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Filter
                                    </button>
                                </div>
                            </div>

                            <button onClick={() => setIsAddUserModalOpen(true)}
                                    id="createProductModalButton"
                                    data-modal-target="createProductModal"
                                    data-modal-toggle="createProductModal"
                                    className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                <svg
                                    className="h-3.5 w-3.5 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true">
                                    <path

                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
                                </svg>
                                Add User
                            </button>

                            <table className="min-w-full border border-gray-300">
                                <thead>
                                <tr>
                                    <th className="border-b p-2 text-left">Nama</th>
                                    <th className="border-b p-2 text-left">Nomor Telepon</th>
                                    <th className="border-b p-2 text-left">Email</th>
                                    <th className="border-b p-2 text-left">Grade ID</th>
                                    <th className="border-b p-2 text-left">Aksi</th>
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
                                            <td className="border-b p-2">
                                                <button
                                                    onClick={() => handleUpdateUser(user)}
                                                    className="bg-yellow-500 hover:bg-yellow-400 text-white px-2 py-1 rounded"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => confirmDeleteUser(user.id)} // Tombol untuk delete
                                                    className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 ml-2 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
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

                            {renderPagination()}
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <UpdateModal
                    isOpen={isModalOpen}
                    user={selectedUser}
                    onClose={closeModal}
                    onSubmit={async (userData) => {
                        await updateUser(selectedUser.id, userData);
                    }}
                />
            )}

            {isAddUserModalOpen && (
                <AddUserModal
                    isOpen={isAddUserModalOpen}
                    onClose={() => setIsAddUserModalOpen(false)} // Close the modal
                    onSubmit={async (userData) => {
                        await handleAddUser(userData); // Handle the addition of the new user
                    }}
                />
            )}

            {isDeleteModalOpen && ( // Add Delete Modal integration
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)} // Close the modal
                    onDelete={handleDeleteUser}
                />
            )}

            <ToastSuccessUpdate
                isVisible={toastVisible}
                onClose={() => setToastVisible(false)}
            />

            <ToastSuccessDelete
                isVisible={toastVisibleDelete}
                onClose={() => setToastVisible(false)}
            />


        </div>
    );
};

export default DashboardPageAdmin;