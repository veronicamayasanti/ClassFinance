import db from '../database.js'

// register operator
export const createOperatorModel = (name, email, phone_number, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO tb_users (name, email, phone_number, password) VALUES (?, ?, ?, ?, ?)';

        db.query(sql, [name, email, phone_number, password], (err, result) => {

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