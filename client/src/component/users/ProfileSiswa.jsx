import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileSiswa() {
  const [dataSiswa, setDataSiswa] = useState({
    id: null,
    nama_siswa: '',
    no_hp: '',
    username: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('dataSiswa'));
    if (!storedData) {
      navigate('/login'); // Arahkan ke login jika tidak ada data
    } else {
      setDataSiswa(storedData);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('dataSiswa'); // Hapus data dari localStorage
    navigate('/'); // Arahkan ke halaman home
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menghapus akun?');
    if (confirmed) {
      localStorage.removeItem('dataSiswa'); // Hapus data dari localStorage
      navigate('/'); // Arahkan ke halaman home
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate update API call
    localStorage.setItem('dataSiswa', JSON.stringify(dataSiswa)); // Simpan data yang diperbarui
    setIsEditing(false); // Kembali ke mode tampilan
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profil Siswa</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={dataSiswa.nama_siswa}
            onChange={(e) => setDataSiswa({ ...dataSiswa, nama_siswa: e.target.value })}
            placeholder="Nama Siswa"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            value={dataSiswa.no_hp}
            onChange={(e) => setDataSiswa({ ...dataSiswa, no_hp: e.target.value })}
            placeholder="No HP"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            value={dataSiswa.username}
            onChange={(e) => setDataSiswa({ ...dataSiswa, username: e.target.value })}
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
      <div className="flex justify-between">
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
      </div>
    </div>
  );
}

export default ProfileSiswa;