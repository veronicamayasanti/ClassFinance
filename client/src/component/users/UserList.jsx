import React, { useEffect, useState } from 'react';

function UserList({ users, onUpdateUser, onDeleteUser }) {
  return (
    <div className="max-w-md mx-auto bg-blue-100 shadow-lg rounded-lg overflow-hidden mt-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 pt-4">User List</h1>
      <ul className="p-4">
        {users.map((user) => (
          <li key={user.id} className="border-b border-black py-2 flex justify-between items-center">
              <span>{user.name}</span>
              <div>
                  <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => onUpdateUser(user.id)}
                      >
                      update
                  </button>
                  <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => onDeleteUser(user.id)}
                  >
                      Delete
                  </button>

              </div>

              </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;