import {
    registerUserModel,
    loginUserModel,
    getAllUserModel,
    getUserByIdModel,
    getUsersByRoleModel,
    getUsersByGradeModel,
    updateUserModel,
    deleteUserModel
} from "../models/userModels.js";
import bcrypt from "bcrypt";
import db from '../database.js'


export const checkEmailExists = (email) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tb_users WHERE email = ?';
        db.query(sql, [email], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results.length > 0);
        })
    })
}

// register user
export const registerUserservice = async (userData) => {
    const {name, phone_number, email, password, role_id, grade_id} = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await registerUserModel(name, phone_number, email, hashedPassword, role_id, grade_id)
}

// login user
export const loginUserService = async (email, password) => {
    const results = await loginUserModel(email);
    if (results.length === 0) throw new Error('Invalid credentials')

    const admin = results[0]
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) throw new Error('Invalid credentials');
    return admin;
}

// Get user by ID
export const getUserByIdService = async (id) => {
    try {
        const user = await getUserByIdModel(id); // Call model to get user by ID
        return user;
    } catch (error) {
        throw new Error('Error in getUserByIdService: ' + error.message);
    }
}

// Get users by role_id
export const getUsersByRoleService = async (roleId) => {
    try {
        return await getUsersByRoleModel(roleId); // Panggil model untuk mendapatkan pengguna
    } catch (error) {
        throw new Error('Error in getUsersByRoleService: ' + error.message);
    }
}

// Get users by grade_id
export const getUsersByGradeService = async (gradeId) => {
    try {
        return await getUsersByGradeModel(gradeId); // Panggil model untuk mendapatkan pengguna
    } catch (error) {
        throw new Error('Error in getUsersByRoleService: ' + error.message);
    }
}

// Get total user count for pagination
export const getTotalUserCount = async (searchTerm = '', roleId = null, gradeId = null) => {
    try {
        let sql = 'SELECT COUNT(*) AS count FROM tb_users WHERE role_id != 1 AND name LIKE ?';
        const params = [`%${searchTerm}%`];

        if (roleId) {
            sql += ' AND role_id = ?';
            params.push(roleId);
        }

        if (gradeId) {
            sql += ' AND grade_id = ?';
            params.push(gradeId);
        }

        return new Promise((resolve, reject) => {
            db.query(sql, params, (error, results) => {
                if (error) {
                    console.error("Error counting users:", error);
                    return reject(error);
                }
                resolve(results[0].count);
            });
        });
    } catch (error) {
        throw new Error('Error in getTotalUserCount: ' + error.message);
    }

}

/// Get all users with pagination and search functionality
export const getAllUserService = async (offset = 0, limit = 10, searchTerm = '', roleId = null, gradeId = null) => {
    try {
        const totalCount = await getTotalUserCount(searchTerm, roleId, gradeId);
        const users = await getAllUserModel(offset, limit, searchTerm, roleId, gradeId);
        return { users, totalCount };
    } catch (error) {
        throw new Error('Error in getAllUserService: ' + error.message);
    }
};

// Update user
export const updateUserService = async (id, name, phone_number, email, grade_id) => {
    try {
        return await updateUserModel(id, name, phone_number, email, grade_id ); // Call model to update user
    } catch (error) {
        throw new Error('Error in updateUserService: ' + error.message);
    }
}

// Delete user
export const deleteUserService = async (id) => {
    try {
        return await deleteUserModel(id); // Call model to delete user
    } catch (error) {
        throw new Error('Error in deleteUserService: ' + error.message);
    }
}

