const API_BASE_URL = 'http://localhost:3000/api/user/'

// register user
export const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json()
}