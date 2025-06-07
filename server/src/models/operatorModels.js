import db from '../database.js'

// register operator
export const createOperatorModel = (name, email, phone_number, username, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO tb_users (name, email, phone_number, username, password) VALUES (?, ?, ?, ?, ?)';
        console.log(email)
        db.query(sql, [name, email, phone_number, username, password], (err, result) => {
            console.log(email)
            if (err) {
                return reject(err);
            }
            resolve(result);
        })
    })
};

// login operator
export const loginOperatorModel = (username) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM korlas_db WHERE username = ?';
        db.query(sql, [username], (err, results) => {
            if(err){
                return reject(err)
            }
            resolve(results)
        })
    })
}