import {
    createBudgetModel,
    getAllBudgetsModel,
    getBudgetByIdModel,
    updateBudgetModel,
    deleteBudgetModel
} from "../models/budgetModel.js";

// create budgets
export const createBudgetService = async (budgetData) => {
    const {grade_id, cost, total, name} = budgetData;
    return await createBudgetModel(grade_id, cost, total, name)
}

// get all budgets service
export const getAllBudgetsService = async () => {
    return await getAllBudgetsModel()
}

// get budget by id
export const getBudgetByIdService = async (id) => {
    try{
        const budget = await getBudgetByIdModel(id);
        return budget
    }catch (error) {
        throw new Error('Error in getBudgetByIdService: '+ error.message)
    }
}

// update budget
export const updateBudgetService = async (id, grade_id, cost, total, name) => {
    try {
        return await updateBudgetModel(id, grade_id, cost, total, name);
    }catch (error) {
        throw new Error('Error in updatebudgetservice: ' + error.message)
    }
}

// delete budget
export const deleteBudgetService = async (id) => {
    try {
        return await deleteBudgetModel(id);
    }catch (error) {
        throw new Error('error in service ' + error.message)
    }
}