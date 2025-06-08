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
export const loginUserModel = (email) =>     {return new Promise ((resolve, reject) => {
    const sql = 'SELECT * FROM tb_users WHERE email = ?';
    db.query(sql, [email], (error, results) => {
        if(error){
            return reject(error, error.message = "error in model")
        }
        resolve(results)
    } )
})
}

// get all user
export const getAllUserModel = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tb_users WHERE role_id != 1';
        db.query(sql, (error, results) => {
            if (error){
                return reject(error, error.message = "error in model")
            }
            resolve(results)
        })
    })
}