import {
    registerUserModel,
    loginUserModel,
    getAllUserModel
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

// Get all user with pagination
export const getAllUserService = async (offset = 0, limit = 10,searchTerm = '') => {
    try {
        return await getAllUserModel(offset, limit, searchTerm); // Call updated model with offset and limit
    } catch (error) {
        throw new Error('Error in getAllUserService: ' + error.message);
    }
}

// Get total user count for pagination
export const getTotalUserCount = async () => {
    try {
        const sql = 'SELECT COUNT(*) AS count FROM tb_users'; // SQL to count total users
        return new Promise((resolve, reject) => {
            db.query(sql, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0].count);
            });
        });
    } catch (error) {
        throw new Error('Error in getTotalUserCount: ' + error.message);
    }
}
