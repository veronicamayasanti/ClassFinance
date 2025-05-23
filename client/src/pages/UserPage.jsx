import React, { useState, useEffect } from "react";
import UserList from "../component/users/UserList.jsx";
import AddUserForm from "../component/users/AddUserForm.jsx";
import {
    fetchUsers,
    addUser,
    updateUser,
    deleteUser
} from "../services/UserApi.js";

function UserPage() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);

    const handleUserAdded = async (name) => {
        const newUser = await addUser(name);
        setUsers([...users, newUser]);
    };

    const handleUpdateUser = async (id) => {
        const newName = prompt('Please enter new name');
        if (newName) {
            const success = await updateUser(id, newName);
            if(success) {
                setUsers(users.map(user => user.id === id ? {...user, name : newName} : user ));
            }
        }
    }

    const handleDeleteUser = async (id) => {
        const success = await deleteUser(id);
        if (success) {
            setUsers(users.filter(user => user.id !== id));
        }
    }

    return (
        <>
            <AddUserForm onUserAdded={handleUserAdded}/>
            <UserList users={users} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser} />
        </>
    )
}

export default UserPage;