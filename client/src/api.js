const API_BASE_URL = 'http://localhost:3000/api'

// register user
export const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json()
}

export const loginUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
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
    let url = `${API_BASE_URL}/user?page=${page}&limit=${limit}&search=${encodeURIComponent(searchTerm)}&roleId=${roleId}&gradeId=${gradeId}`;

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
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
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
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json(); // Mengembalikan respons dari server
};

// get by id user
export const getUserById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user by ID');
    }
    return response.json();
};

// get all budget
export const getAllBudgetApi = async () => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch budgets');
    }
    return response.json();
};

// Update budget
export const updateBudgetApi = async (id, budgetData) => {
    const response = await fetch(`${API_BASE_URL}/budget/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(budgetData),
    });
    return response.json();
};