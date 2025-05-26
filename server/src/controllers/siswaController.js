import db from "../database.js";
import bcrypt from 'bcrypt';

// register siswa
export const registerSiswa = async (req, res) => {
    const {nama_siswa, no_hp, username, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO data_siswa (nama_siswa, no_hp, username, password) VALUES (?, ?, ?, ?)';
        db.query(sql, [nama_siswa, no_hp, username, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({error: err.message})
            }
            res.status(201).json({message: `register sukses` })
        } )

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// login siswa
export const loginSiswa = (req, res) => {
    const {username, password} = req.body;
    const sql = 'SELECT * FROM data_siswa WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        if (results.length === 0 ){
            return res.status(401).json({error: "Invalid credentials"})
        }

        const data_siswa = results[0];
        const validPassword = await bcrypt.compare(password, data_siswa.password);
        if (!validPassword) {
            return res.status(401).json({err: "Invalid credentials" });
        }
        res.json(results[0])
    })
}

// Mendapatkan data siswa berdasarkan ID
export const getUserById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM data_siswa WHERE id = ?';

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        const { password, ...userWithoutPassword } = results[0]; // Menghapus password
        res.json(userWithoutPassword);
    });
};


// update data siswa
export const updateUser = (req, res) => {
    const { id } = req.params;
    const { nama_siswa, no_hp, username } = req.body;
    const sql = 'UPDATE data_siswa SET nama_siswa = ?, no_hp = ?, username = ? WHERE id = ? ';
    db.query(sql, [nama_siswa, no_hp, username, id], (err, result) => {
        if(err) {
            return res.status(500).json({error: err.message})
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "id not found"});
        }
        res.json({message: "data siswa update successfully"})
    })
}

// menghapus data siswa
export const deleteUser = (req, res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM data_siswa WHERE id = ?'
    db.query(sql, [id], (err, result) => {
        if(err) {
            return res.status(500).json({error: err.message});
        }
        if (result.affectedRows === 0){
            return res.status(404).json({error: 'user not found'})
        }
        res.json({message: 'User deleted successfully'})
    })
}