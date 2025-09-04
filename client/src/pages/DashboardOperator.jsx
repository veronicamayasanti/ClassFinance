import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { getAllUsers,
    updateUserApi,
    deleteUser,
    registerUser,
    getUserById,
    getAllBudgetApi,
    updateBudgetApi,
    deleteBudgetApi } from '../api';
import UpdateModal from "./UpdateModal.jsx";
import DeleteModal from "./DeleteModal.jsx";
import AddUserModal from "./AddUserModal.jsx";
import ToastSuccessUpdate from "./ToastSuccessUpdate.jsx";
import ToastSuccessDelete from "./ToastSuccessDelete.jsx";
import Pagination from "./Pagination.jsx";
import UpdateModalBudget from "./UpdateModalBudget.jsx";

function DashboardOperator() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [showUsers, setShowUsers] = useState(false);
    const [showView, setShowView] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [limit, setLimit] = useState(2);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedBudget, setSelectedBudget] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateBudgetOpen, setIsModalUpdateBudgetOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [budgetToDelete, setBudgetToDelete] = useState(null);

    const [toastVisible, setToastVisible] = useState(false);
    const [toastVisibleDelete, setToastVisibleDelete] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    const [budgets, setBudgets] = useState([]);
    const [budgetError, setBudgetError] = useState(null);
    const [showBudgets, setShowBudgets] = useState(false);

    const userName = localStorage.getItem('userName');
    const gradeId = localStorage.getItem('userGradeId')
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userRoleId');
        localStorage.removeItem('userGradeId');
        navigate('/');
    };

    const fetchUsers = async (page, searchTerm) => {
        try {
            const result = await getAllUsers(page, limit, searchTerm,null,  gradeId );
            setUsers(result.users);
            setTotalPages(result.totalPages);
        } catch (err) {
            console.error("Fetch error:", err); // Log any errors
            setError(err.message);
        }
    };

    const fetchBudgets = async () => {
        try {
            const result = await getAllBudgetApi(); // Fetch budgets
            setBudgets(result); // Store fetched budgets
            console.log(result)
        } catch (err) {
            console.error("Fetch error:", err);
            setBudgetError(err.message); // Handle budget fetch error
        }
    };

    useEffect(() => {
        if (showView === 'users') {
            fetchUsers(currentPage, searchTerm);
        } else if (showView === 'budgets') {
            fetchBudgets();
        } else if (showView === 'profile') {
            fetchProfile();
        }
    }, [currentPage, showView, limit, searchTerm]);

    const handleShowView = (view) => {
        if (showView === view) {
            setShowView(''); // If the same button is clicked, hide
        } else {
            setShowView(view); // Change view
            setCurrentPage(1); // Reset to first page
        }
    };

    const handleShowUsers = async () => {
        if (showUsers) {
            // If already showing users, clear the user profile and set showUsers to false
            setUserProfile(null);
            setShowUsers(false);
        } else {
            // Show  vvvv
            await fetchUsers(currentPage, searchTerm);
            setShowUsers(true);
            setUserProfile(null); // Clear profile when viewing users
        }
    };



    const handleShowBudgets = async () => {
        if (showBudgets) {
            setShowBudgets(false); // Hide budgets
        } else {
            await fetchBudgets(1); // Fetch budgets for the first page
            setShowBudgets(true); // Show budgets
        }
    };


    const handleSearchChange = async  (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setCurrentPage(1); // Set currentPage ke 1 saat pencarian diubah
        await fetchUsers(1, value);
    };

    const changePage = (page) => {
        if (page < 1 || page > totalPages) return; // Validasi halaman
        setCurrentPage(page);
        fetchUsers(page, searchTerm); // Ambil pengguna sesuai dengan halaman dan searchTerm
    };

    const handleUpdateUser = async (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleUpdateBudget = async (budget) => {
        setSelectedBudget(budget);
        setIsModalUpdateBudgetOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const closeModalUpdateBudget = () => {
        setIsModalUpdateBudgetOpen(false);
        setSelectedBudget(null);
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

    const updateBudget = async (budgetId, budgetData) => {
        try {
            await updateBudgetApi(budgetId, budgetData);
            fetchBudgets(currentPage, searchTerm);
            closeModalUpdateBudget();
            handleShowToast()
            setTimeout(() => {
                setToastVisible(false); // Hide toast after 3 seconds
            }, 3000);
        } catch (error) {
            setError('Error updating user: ' + error.message);
            console.log('error update budget ' +error.message)
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

    const handleDeleteBudget = async () => {
        if (budgetToDelete) {
            try {
                await deleteBudgetApi(budgetToDelete); // Delete user by ID
                fetchUsers(currentPage, searchTerm); // Refresh data after delete
                setIsDeleteModalOpen(false); // Close modal
                handleShowToastDelete()
            } catch (error) {
                setError('Error deleting user: ' + error.message);
            }
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
        setBudgetToDelete(id)
        setIsDeleteModalOpen(true); // Open delete modal
    };



    const fetchProfile = async () => {
        try {
            const userData = await getUserById(userId);
            setUserProfile(userData); // Set profile data
            setShowView('profile'); // Ensure profile view is set
        } catch (err) {
            setError("could not fetch profile data.");
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/4 bg-gray-800 text-white p-5">
                <h2 className="text-2xl font-bold mb-4">Catatan Kas kelas {gradeId} SDN Cileles</h2>
                <ul className="space-y-2">
                    <li>
                        <button onClick={() => handleShowView('profile')} className="w-full text-left bg-green-600 hover:bg-green-500 px-4 py-2 rounded">
                            My Profile
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleShowView('users')} className="w-full text-left bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">
                            All Students Grade {gradeId}
                        </button>
                    </li>

                    <li>
                        <button onClick={() => handleShowView('budgets')} className="w-full text-left bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded">
                            All Budgets
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
                <h1 className="text-3xl font-semibold mb-4">Selamat datang korlas, {userName} !</h1>
                {error && <p className="text-red-500">{error}</p>}

                {showView === 'profile' && userProfile && (
                    <div className="bg-white p-5 rounded shadow-md w-xs">
                        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
                        <table className="min-w-full bg-white">
                            <tbody>
                            <tr>
                                <td>Full Name :</td>
                                <td>{userProfile.name}</td>
                            </tr>
                            <tr>
                                <td>Email Address :</td>
                                <td>{userProfile.email}</td>
                            </tr>
                            <tr>
                                <td>Phone Number :</td>
                                <td>{userProfile.phone_number}</td>
                            </tr>
                            <tr>
                                <td>Grade :</td>
                                <td>{userProfile.grade_id}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {showView === 'users' && (
                    <div className="mt-5">
                        <h4 className="text-3xl font-semibold mb-4"> Daftar Siswa Kelas {gradeId} </h4>
                        <div className="mb-5 flex items-center space-x-4">
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="flex-1 max-w-xs rounded-md bg-white px-2 py-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm border-2"
                            />
                            <label className="block text-sm font-medium text-gray-900 mb-1">entries per page:</label>
                            <select
                                value={limit}
                                onChange={(e) => {
                                    setLimit(Number(e.target.value));
                                    setCurrentPage(1);
                                    fetchUsers(1, searchTerm);
                                }}
                                className="rounded-md bg-white px-2 py-1 text-base text-gray-900 sm:text-sm border-2"
                            >
                                <option value={2}>2</option>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                            </select>
                            <button onClick={() => setIsAddUserModalOpen(true)} className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-500 rounded-lg px-4 py-2">
                                Add User
                            </button>
                        </div>
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
                                                onClick={() => confirmDeleteUser(user.id)}
                                                className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 ml-2 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="border-b p-2 text-center">Tidak ada pengguna yang ditemukan.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                )}

                {showView === 'budgets' && (
                    <div className="mt-5">
                        {budgetError && <p className="text-red-500">{budgetError}</p>}
                        <h4 className="text-3xl font-semibold mb-4">Daftar Anggaran</h4>
                        <table className="min-w-full border border-gray-300">
                            <thead>
                            <tr>
                                <th className="border-b p-2 text-left">Budget ID</th>
                                <th className="border-b p-2 text-left">Name</th>
                                <th className="border-b p-2 text-left">Cost</th>
                                <th className="border-b p-2 text-left">Total</th>
                                <th className="border-b p-2 text-left">Aksi</th>
                            </tr>
                            </thead>
                            <tbody>
                            {budgets.length > 0 ? (
                                budgets.map((budget) => (
                                    <tr key={budget.id}>
                                        <td className="border-b p-2">{budget.id}</td>
                                        <td className="border-b p-2">{budget.name}</td>
                                        <td className="border-b p-2">{budget.cost}</td>
                                        <td className="border-b p-2">{budget.total}</td>
                                        <td className="border-b p-2">
                                            <button
                                                onClick={() => handleUpdateBudget(budget)} // Adjust this if you have a different update logic for budgets
                                                className="bg-yellow-500 hover:bg-yellow-400 text-white px-2 py-1 rounded"
                                            >
                                                Update
                                            </button>
                                            <button
                                                // Set your delete logic if it exists

                                                onClick={() => confirmDeleteUser(budget.id)}
                                                className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 ml-2 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="border-b p-2 text-center">Tidak ada anggaran yang ditemukan.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
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

            {isModalUpdateBudgetOpen && (
                <UpdateModalBudget
                    isOpen={isModalUpdateBudgetOpen}
                    budget={selectedBudget}
                    onClose={closeModalUpdateBudget}
                    onSubmit={async (budgetData) => {
                        await updateBudget(selectedBudget.id, budgetData);
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

            {isDeleteModalOpen && ( // Add Delete Modal integration
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)} // Close the modal
                    onDelete={handleDeleteBudget}
                />
            )}

            <ToastSuccessUpdate
                isVisible={toastVisible}
                onClose={() => setToastVisible(false)}
            />

            <ToastSuccessDelete
                isVisible={toastVisibleDelete}
                onClose={() => setToastVisibleDelete(false)}
            />

        </div>
    );
}

export default DashboardOperator;