import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterSiswa() {
  const [namaSiswa, setNamaSiswa] = useState('');
  const [noHp, setNoHp] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama_siswa: namaSiswa,
          no_hp: noHp,
          username,
          password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setNamaSiswa('');
        setNoHp('');
        setUsername('');
        setPassword('');
        navigate('/login');
      } else {
        throw new Error('Failed to register');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-blue-100 p-4 rounded shadow">
      <input
        type="text"
        value={namaSiswa}
        onChange={(e) => setNamaSiswa(e.target.value)}
        placeholder="Nama Siswa"
        className="border border-gray-300 p-2 rounded"
      />
      <input
        type="text"
        value={noHp}
        onChange={(e) => setNoHp(e.target.value)}
        placeholder="No HP"
        className="border border-gray-300 p-2 rounded"
      />
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
        Register Siswa
      </button>
    </form>
  );
}

export default RegisterSiswa;