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
    console.log(typeof name, name)
    const sql = 'INSERT INTO users (name) VALUES (?)';
    db.query(sql, [name], (err, result) =>{
        if (err) {
            return  res.status(500).json({error: err.message})
        }
        res.status(201).json({id: result.insertId, name})
    } )
}
