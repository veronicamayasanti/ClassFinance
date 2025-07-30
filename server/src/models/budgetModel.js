import db from "../database.js"

// create budget
export const createBudgetModel = (grade_id, cost, total, name) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO tb_budgets (grade_id, cost, total, name) values (?,?,?,?)';
        db.query(sql, [grade_id, cost, total, name], (error, result) => {
            if(error){
                return reject(error, error.message = "error in model");
            }
            resolve(result)
        })
    })
}

