import db from "../database.js"

// mendapatkan semua nama users
export const getAllUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            return  res.status(500).json({error: err.message})
        }
        res.json(result)
    })
}

// menambah users
export const createUser = (req, res) => {
    const {name} = req.body;
    const sql = 'INSERT INTO users (name) VALUES (?)';
    db.query(sql, [name], (err, result) =>{
        if (err) {
            return  res.status(500).json({error: err.message})
        }
        res.status(201).json({id: result.insertId, name})
    } )
}

// mengedit name user
export const updateUser = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const sql = 'UPDATE users SET name = ? WHERE id = ? ';
    db.query(sql, [name, id], (err, result) => {
        if(err) {
            return res.status(500).json({error: err.message})
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "user not found"});
        }
        res.json({message: "user update successfully"})
    })
}

// menghapus user
export const deleteUser = (req, res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM users WHERE id = ?'
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