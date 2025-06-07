import {
    loginAdminModel
} from "../models/adminModels.js";
import bcrypt from "bcrypt";

export const loginAdminService = async (username, password) => {
    const results = await loginAdminModel(username);
    if (results.length === 0) throw new Error('Invalid credentials')

    const admin = results[0]
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) throw new Error('Invalid credentials');
    return admin;
}