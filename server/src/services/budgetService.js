import {
    createBudgetModel
} from "../models/budgetModel.js";

export const createBudgetService = async (budgetData) => {
    const {grade_id, cost, total, name} = budgetData;
    return await createBudgetModel(grade_id, cost, total, name)
}