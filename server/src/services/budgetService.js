import {
    createBudgetModel,
    getAllBudgetsModel
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