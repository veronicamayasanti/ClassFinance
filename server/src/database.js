import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user : "root",
    password: "123456",
    database: "db-kas"
})

db.connect((err) => {
    if (err) {
        console.error('database connection failed: ', err.stack);
        return;
    }
    console.log('connected to MYSQL database')
})

export default db;