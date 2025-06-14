import React, { useState } from 'react';
import { registerUser } from '../api/userService.js'; // Pastikan untuk mengimpor fungsi registerUser

const RegisterPage = () => {
    // State untuk menyimpan data input
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState(3);
    const [gradeId, setGradeId] = useState(1); // Atau nilai default sesuai kebutuhan
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Fungsi untuk menangani pengiriman form
    const handleSubmit = async (e) => {
        e.preventDefault(); // Mencegah reload halaman saat submit form

        try {
            const userData = { name, phone_number: phoneNumber, email, password, grade_id: gradeId };
            const response = await registerUser(userData);

            if (response.error) {
                // Menetapkan error jika ada
                setError(response.error);
                setSuccessMessage(null);
            } else {
                // Menetapkan success message jika pendaftaran berhasil
                setSuccessMessage('Registration successful!');
                setError(null);
            }
        } catch (err) {
            setError('An error occurred. Please try again.'); // Menangani error jika ada
            setSuccessMessage(null);
        }
    };

    return (
        <div className="register-user">
            <h2>Register User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Role ID:</label>
                    <input
                        type="number"
                        value={roleId}
                        onChange={(e) => setGradeId(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Grade ID:</label>
                    <input
                        type="number"
                        value={gradeId}
                        onChange={(e) => setGradeId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>

            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
        </div>
    );
};

export default RegisterPage;