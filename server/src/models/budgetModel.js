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

// get all budgets
export const getAllBudgetsModel = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tb_budgets';
        db.query(sql, (error,result) => {
            if(error){
                return reject(error, error.message = "error in model");
            }
            resolve(result)
        })
    })
}

// get budget by id
export const getBudgetByIdModel = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tb_budgets WHERE id = ? '
        db.query(sql, [id], (error, result) => {
            if(error){
                return reject(error);
            }
            if(result.length === 0){
                return reject(new Error("Budget not found"))
            }
            resolve(result[0])
        })
    })
}

// update data budget
export const updateBudgetModel = (id,grade_id, cost, total, name) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE tb_budgets SET grade_id = ?, cost = ?, total = ?, name = ? WHERE id = ?';
        db.query(sql, [grade_id, cost, total, name, id], (error, result) => {
            if (error) {
                return reject(error, error.message = "error update in model")
            }
            resolve(result);
        })
    })
}
