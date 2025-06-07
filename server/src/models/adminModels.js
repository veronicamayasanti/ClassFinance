import db from '../database.js'

export const loginAdminModel = (email) => {
    return new Promise ((resolve, reject) => {
        const sql = 'SELECT * FROM tb_users WHERE email = ? AND role_id = 1';
        db.query(sql, [email], (err, results) => {
            if(err){
                return reject(err)
            }
            resolve(results)
        } )
    })
}