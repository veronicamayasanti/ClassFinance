import './App.css'
import React, { useState, useEffect } from 'react';
import UserList from './component/UserList';
import AddUserForm from './component/AddUserForm';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

    const handleUserAdded = (newUser) => {
        setUsers([...users, newUser]);
    };

    const handleUpdateUser = async (id) => {
        const newName = prompt('Please enter new name:');
        if (newName) {
            const response = await fetch(`http://localhost:3000/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newName }),
            });

            if (response.ok) {
                setUsers(users.map(user => user.id === id ? { ...user, name: newName } : user));
            }
        }
    };

    const handleDeleteUser = async (id) => {
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">
       <AddUserForm onUserAdded={handleUserAdded} />
       <UserList users={users} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser} />
      </div>
    </div>
  );
}

export default App;