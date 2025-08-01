import {createBudgetService} from "../services/budgetService.js";
export const createBudgetController = async (req, res) => {
    try{
        await createBudgetService(req.body);
        res.status(201).json({message: 'create budget data success'})
    }catch (error) {
        res.status(500).json(error, error.message = "error in controller")
    }
}