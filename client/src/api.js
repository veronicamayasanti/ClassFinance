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
export const getAllUsers = async () => {
    const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch users'); // Menangani kesalahan jika respons tidak ok
    }
    return response.json(); // Mengembalikan hasil JSON
};