import React, { useState } from 'react';
import {registerUser} from "../api.js";
import ToastSuccessAdd from "./ToastSuccessAdd.jsx"; // Import success toast
import ToastErrorAddUser from "./ToastErrorAddUser.jsx"; // Import error toast



const AddUserModal = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roleId] = useState(3);
    const [gradeId, setGradeId] = useState(1);

    const [error, setError] = useState(null);
    const [toastVisibleSuccess, setToastVisibleSuccess] = useState(false);
    const [toastVisibleError, setToastVisibleError] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            name,
            phone_number: phoneNumber,
            email,
            password,
            role_id: roleId,
            grade_id: gradeId
        };

        try {
            const response = await registerUser(userData);
            if (response.error) {
                setError(response.error);
                setToastVisibleSuccess(false);
                setToastVisibleError(true)
            } else {
                setError(null);
                setToastVisibleSuccess(true);
                if (onSubmit) {
                    onSubmit(userData);
                }
                onClose(); // Close the modal after successful addition
            }
            setTimeout(() => {
                setToastVisibleSuccess(false);
                setToastVisibleError(false);
            }, 3000);
        } catch (error) {
            setError('Error adding user: ' + error.message);
            setToastVisibleSuccess(false);
            setToastVisibleError(true);
        }
    };


    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center`} style={{backdropFilter: 'blur(3px)'}}>
            <div className="relative p-6 w-full max-w-2xl bg-gray-300 rounded-lg shadow-lg">
                {/* Toast Message */}
                {toastVisibleSuccess && (
                    <ToastSuccessAdd isVisible={toastVisibleSuccess} onClose={() => setToastVisibleSuccess(false)} />
                )}
                {toastVisibleError && (
                    <ToastErrorAddUser isVisible={toastVisibleError} onClose={() => setToastVisibleError(false)} />
                )}

                <div className="flex justify-between items-center pb-4 mb-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Add User</h3>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        onClick={onClose}
                    >
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                {/* Modal body */}
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900">Phone
                                Number</label>
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900">Passowrd</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="grade_id" className="block mb-2 text-sm font-medium text-gray-900">Grade
                                ID</label>
                            <input
                                type="number"
                                value={gradeId}
                                onChange={(e) => setGradeId(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required
                            />
                        </div>
                        <input type="hidden" value={roleId}/>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            type="submit"
                            className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Add User
                        </button>
                        <button
                            type="button"
                            className="text-red-600 inline-flex items-center border border-red-600 hover:bg-red-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
            </div>
    );
};

export default AddUserModal;