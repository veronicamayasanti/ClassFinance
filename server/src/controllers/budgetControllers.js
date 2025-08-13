import {
    createBudgetService,
    getAllBudgetsService
} from "../services/budgetService.js";
export const createBudgetController = async (req, res) => {
    try{
        await createBudgetService(req.body);
        res.status(201).json({message: 'create budget data success'})
    }catch (error) {
        res.status(500).json(error, error.message = "error in controller")
    }
}

// get all budgets controller
export const getAllBudgetsController = async (req, res) => {
    try {
        const budgets = await getAllBudgetsService();
        res.status(200).json(budgets)
    } catch (error) {
        res.status(500).json({message: "error in controller java", error} )
    }
}
