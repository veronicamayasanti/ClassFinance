import db from '../database.js'



// register user
export  const registerUserModel = (name, phone_number, email, password, role_id, grade_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO tb_users (name, phone_number, email, password, role_id, grade_id) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [name, phone_number, email, password,role_id, grade_id], (error, result) => {
            if (error){
                return reject(error, error.message = "error in model");
            }
            resolve(result)
        })
    })
}

//  login user
export const loginUserModel = (email) => {return new Promise ((resolve, reject) => {
    const sql = 'SELECT * FROM tb_users WHERE email = ?';
    db.query(sql, [email], (error, results) => {
        if(error){
            return reject(error, error.message = "error in model")
        }
        resolve(results)
    } )
})}

// get all user
export const getAllUserModel = (offset = 0, limit = 10, searchTerm = '') => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tb_users WHERE role_id != 1 AND name LIKE ? LIMIT ?, ? '; // SQL with pagination
        db.query(sql, [`%${searchTerm}%`, offset, limit], (error, results) => {
            if (error) {
                return reject(error, error.message = "error in model");
            }
            resolve(results);
        });
    });
}

// Get user by ID
export const getUserByIdModel = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tb_users WHERE id = ? AND role_id != 1';
        db.query(sql, [id], (error, result) => {
            if (error) {
                console.error("DB query error:", error);
                return reject(error);
            }
            // Pastikan kita mendapat satu pengguna
            if (result.length === 0) {
                return reject(new Error("User not found"));
            }
            resolve(result[0]); // Mengembalikan user pertama
        });
    });
}

// Get users by role_id
export const getUsersByRoleModel = (roleId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tb_users WHERE role_id = ? AND role_id != 1';
        db.query(sql, [roleId], (error, results) => {
            if (error) {
                console.error("DB query error:", error);
                return reject(error);
            }
            resolve(results); // Mengembalikan semua hasil yang ditemukan
        });
    });
}

// Get users by grade_id
export const getUsersByGradeModel = (gradeId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tb_users WHERE grade_id = ? ';
        db.query(sql, [gradeId], (error, results) => {
            if (error) {
                console.error("DB query error:", error);
                return reject(error);
            }
            resolve(results); // Mengembalikan semua hasil yang ditemukan
        });
    });
}

// update data user
export const updateUserModel = (id, name, phone_number, email, grade_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE tb_users SET name = ?, phone_number = ?, email = ?, grade_id = ? WHERE id = ?';
        db.query(sql, [name, phone_number, email,  grade_id, id], (error, result) => {
            if (error) {
                console.error("DB query error:", error);
                return reject(error, error.message = "error update in model");
            }
            resolve(result);
        });
    });
}

// Delete user
export const deleteUserModel = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM tb_users WHERE id = ? AND role_id != 1';
        db.query(sql, [id], (error, result) => {
            if (error) {
                return reject(error, error.message = "error in model");
            }
            resolve(result);
        });
    });
}