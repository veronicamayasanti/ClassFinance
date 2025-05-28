import {
    createUser,
    getSiswaByUsername,
    getSiswaById,
    updateSiswa,
    deleteSiswa
} from "../models/userModels..js";
import bcrypt from "bcrypt";

export const registerUser = async (userData) => {
    const {nama_siswa, no_hp, username, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await createUser(nama_siswa, no_hp, username, hashedPassword);
};

export const loginUser = async (username, password) => {
    const results = await getSiswaByUsername(username);
    if (results.length === 0) throw new Error('User not found');

    const data_siswa = results[0];
    const validPassword = await bcrypt.compare(password, data_siswa.password);
    if (!validPassword) throw new Error('Invalid credentials');

    return data_siswa; // Kembalikan data siswa yang valid tanpa password
}

export const fetchUserById = async (id) => {
    const results = await getSiswaById(id);
    if (results.length === 0) throw new Error('User not found');
    const { password, ...userWithoutPassword } = results[0]; // Hapus password
    return userWithoutPassword; // Kembalikan data siswa tanpa password
};

export const modifyUser = async (id, siswaData) => {
    return await updateSiswa(id, siswaData.nama_siswa, siswaData.no_hp, siswaData.username);
};

export const removeUser = async (id) => {
    return await deleteSiswa(id);
};