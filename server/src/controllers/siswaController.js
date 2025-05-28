import {
    registerUser as registerUserService,
    loginUser as loginUserService,
    fetchUserById as fetchUserByIdService,
    modifyUser as updateUserService,
    removeUser as deleteUserService
} from "../service/UserService.js";

// register siswa
export const registerUser = async (req, res) => {
    try {
        await registerUserService(req.body);
        res.status(201).json({message: 'Register Sukses'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// login siswa
export const loginSiswa = async (req, res) => {
    try {
        const user = await loginUserService(req.body.username, req.body.password);
        const { password, ...userWithoutPassword } = user; // Hapus password dari hasil
        res.json(userWithoutPassword); // Kirim data siswa tanpa password
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};


// Mendapatkan data siswa berdasarkan ID
export const getUserById = async (req, res) => {
    try {
        const user = await fetchUserByIdService(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// update data siswa
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nama_siswa, no_hp, username } = req.body;

    try {
        // Update data siswa di database
        await updateUserService(id, { nama_siswa, no_hp, username });

        // Ambil data yang diperbarui
        const updatedUser = await fetchUserByIdService(id);  // Ambil data terbaru

        res.json(updatedUser); // Kirim data siswa yang terbaru
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// menghapus data siswa
export const deleteUser = async (req, res) => {
    try {
        await deleteUserService(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};