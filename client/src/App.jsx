import './App.css'
import React, { useState, useEffect } from 'react';
import UserList from './component/UserList';
import AddUserForm from './component/AddUserForm';

function App() {
  const [users, setUsers] = useState([]);

  const handleUserAdded = (newUser) => {
    setUsers([...users, newUser]);
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="App">
       <AddUserForm onUserAdded={handleUserAdded} />
       <UserList users={users} />
    </div>
  );
}

export default App;