import {
    registerUserModel
} from "../models/userModels.js";
import bcrypt from "bcrypt";
import db from "../database.js";

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