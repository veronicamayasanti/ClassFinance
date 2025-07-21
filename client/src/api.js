const API_BASE_URL = 'http://localhost:3000/api/user'

// register user
export const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json()
}

export const loginUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json()
}

// Get all users
export const getAllUsers = async (page, limit, searchTerm = '', roleId = null, gradeId = null) => {
    let url = `${API_BASE_URL}?page=${page}&limit=${limit}&search=${encodeURIComponent(searchTerm)}&roleId=${roleId}&gradeId=${gradeId}`;

    if (roleId) {
        url += `&roleId=${roleId}`;
    }
    if (gradeId) {
        url += `&gradeId=${gradeId}`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
};
// Update user
export const updateUserApi = async (id, userData) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json();
};

// Delete user
export const deleteUser = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json(); // Mengembalikan respons dari server
};
