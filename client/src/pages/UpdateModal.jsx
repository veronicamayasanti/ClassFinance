import React from 'react';

const UpdateModal = ({ isOpen, onClose, onSubmit, user }) => {
    if (!isOpen) return null; // Jika modal tidak terbuka, kembalikan null

    const handleSubmit = (e) => {
        e.preventDefault(); // Mencegah reload halaman
        onSubmit({
            name: document.getElementById('name').value, // Dapatkan nilai dari input
            phone_number: document.getElementById('phone_number').value,
            email: document.getElementById('email').value,
            grade_id: document.getElementById('grade_id').value,
        }); // Menggunakan objek untuk menyimpan data};
    }
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center`} style={{ backdropFilter: 'blur(2px)' }}>
        <div className="relative p-6 w-full max-w-2xl bg-gray-300 rounded-lg shadow-lg">
                <div className="flex justify-between items-center pb-4 mb-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Update User</h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            onClick={onClose}
                        >
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
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
                                    name="name"
                                    id="name"
                                    defaultValue={user.name} // Menggunakan defaultValue untuk menampilkan data pengguna yang ada
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone_number"
                                    id="phone_number"
                                    defaultValue={user.phone_number} // Menampilkan nomor telepon saat ini
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    defaultValue={user.email} // Menampilkan email saat ini
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="grade_id" className="block mb-2 text-sm font-medium text-gray-900">Grade ID</label>
                                <input
                                    type="number"
                                    name="grade_id"
                                    id="grade_id"
                                    defaultValue={user.grade_id} // Menampilkan Grade ID saat ini
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                type="submit"
                                className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Update User
                            </button>
                            <button
                                type="button"
                                className="text-red-600 inline-flex items-center border border-red-600 hover:bg-red-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={onClose} // Menutup modal
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    );
};

export default UpdateModal;