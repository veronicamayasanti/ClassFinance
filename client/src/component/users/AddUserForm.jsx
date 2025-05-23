import React, { useState } from 'react';

function AddUserForm({ onUserAdded }) {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const newUser = await response.json();
      onUserAdded(newUser);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-6 bg-blue-100 p-4 rounded shadow">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        className="border border-gray-300 p-2 rounded flex-grow"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add User</button>
    </form>
  );
}

export default AddUserForm;