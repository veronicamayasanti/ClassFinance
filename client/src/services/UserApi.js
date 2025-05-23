const API_BASE = 'http://localhost:3000/api'

export const fetchUsers = async () => {
    const response = await fetch(`${API_BASE}/users`);
    return await response.json();
};


export const addUser = async (name) => {
    const response = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(({name})),
    });
    return await response.json();
}

export const updateUser = async (id, name) => {
    const response = await fetch(`${API_BASE}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(({name}))
    })
    return response.oke
}

export const deleteUser = async (id) => {
    const response = await fetch(`${API_BASE}/users/${id}`, {
        method: 'DELETE',
    });
    return response.ok;
}