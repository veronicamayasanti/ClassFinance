import db from '../database.js'

export const createUser = (nama_siswa, no_hp, username, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO data_siswa (nama_siswa, no_hp, username, password) VALUES (?, ?, ?, ?)';
        db.query(sql, [nama_siswa, no_hp, username, password], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        })
    })
};

export const getSiswaByUsername = (username) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM data_siswa WHERE username = ?';
        db.query(sql, [username], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results)
        });
    })
}

export const getSiswaById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM data_siswa WHERE id = ?';
        db.query(sql, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

export const updateSiswa = (id, nama_siswa, no_hp, username) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE data_siswa SET nama_siswa = ?, no_hp = ?, username = ? WHERE id = ?';
        db.query(sql, [nama_siswa, no_hp, username, id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

export const deleteSiswa = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM data_siswa WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};