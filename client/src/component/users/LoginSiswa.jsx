import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginSiswa() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setUsername('');
        setPassword('');
        localStorage.setItem('username', username);
        localStorage.setItem('id', result.id );

        navigate('/halamansiswa'); // Mengarahkan ke halaman siswa
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-blue-100 p-4 rounded shadow">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="border border-gray-300 p-2 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border border-gray-300 p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Login
      </button>
    </form>
  );
}

export default LoginSiswa;