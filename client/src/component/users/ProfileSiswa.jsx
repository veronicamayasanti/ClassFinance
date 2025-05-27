import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileSiswa() {
  const [dataSiswa, setDataSiswa] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({
    nama_siswa: '',
    no_hp: '',
    username: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedId = localStorage.getItem('id'); // Ambil ID dari localStorage
    if (!storedId) {
      navigate('/login'); // Arahkan ke login jika tidak ada ID
      return;
    }

    // Ambil data siswa berdasarkan ID
    fetch(`http://localhost:3000/api/users/${storedId}`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch user');
        return response.json();
      })
      .then(data => {
        const { password, ...userWithoutPassword } = data; // Menghapus password
        setDataSiswa(userWithoutPassword);
        setTempData(userWithoutPassword); // Simpan data awal untuk editing
      })
      .catch(err => {
        console.error(err.message);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('username'); // Hapus username dari localStorage
    localStorage.removeItem('id'); // Hapus ID dari localStorage
    localStorage.removeItem('dataSiswa');
    navigate('/'); // Arahkan ke halaman home
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menghapus akun?');
    if (confirmed) {
      const storedId = localStorage.getItem('id');
      await fetch(`http://localhost:3000/api/users/${storedId}`, {
        method: 'DELETE',
      });
      localStorage.removeItem('username'); // Hapus data dari localStorage
      localStorage.removeItem('id');
      localStorage.removeItem('dataSiswa');// Hapus ID dari localStorage
      navigate('/'); // Arahkan ke halaman home
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedId = localStorage.getItem('id');
    const response = await fetch(`http://localhost:3000/api/users/${storedId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tempData),
    });

    if (response.ok) {
      const updatedData = await response.json();
      setDataSiswa(updatedData); // Update state dengan data terbaru
      // Simpan data terbaru di localStorage jika diperlukan
      localStorage.setItem('dataSiswa', JSON.stringify(updatedData));
      setIsEditing(false); // Kembali ke mode tampilan
    } else {
      console.error('Failed to update user');
    }
  };

  if (!dataSiswa) {
    return <div>Loading...</div>; // Tampilkan loading saat data sedang diambil
  }

  return (
    <div className="bg-gray-100 p-4 rounded shadow max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profil Siswa</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={tempData.nama_siswa}
            onChange={(e) => setTempData({ ...tempData, nama_siswa: e.target.value })}
            placeholder="Nama Siswa"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            value={tempData.no_hp}
            onChange={(e) => setTempData({ ...tempData, no_hp: e.target.value })}
            placeholder="No HP"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            value={tempData.username}
            onChange={(e) => setTempData({ ...tempData, username: e.target.value })}
            placeholder="Username"
            className="border border-gray-300 p-2 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Simpan Perubahan
          </button>
        </form>
      ) : (
        <div className="mb-4">
          <p><strong>Nama Siswa:</strong> {dataSiswa.nama_siswa}</p>
          <p><strong>No HP:</strong> {dataSiswa.no_hp}</p>
          <p><strong>Username:</strong> {dataSiswa.username}</p>
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleEdit}
          className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
          Hapus Akun
        </button>
        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
          Logout
        </button>
        <button
            onClick={() => navigate('/halamansiswa')}
            className="bg-blue-300 text-white p-2 rounded hover:bg-blue-400">
          Kembali
        </button>
      </div>
    </div>
  );
}

export default ProfileSiswa;