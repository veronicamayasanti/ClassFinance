import db from '../database.js'

// membuat akun operator
export const createOperatorModel = (name, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO operator (name, password) VALUES (?, ?)';
        db.query(sql, [name, password], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        })
    })
};

