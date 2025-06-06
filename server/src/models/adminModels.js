import db from '../database.js'

export const loginAdminModel = (username) => {
    return new Promise ((resolve, reject) => {
        const sql = 'SELECT * FROM tb_users WHERE username = ? AND role_id = 1';
        db.query(sql, [username], (err, results) => {
            if(err){
                return reject(err)
            }
            resolve(results)
        } )
    })
}