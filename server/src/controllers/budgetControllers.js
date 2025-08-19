import {
    createBudgetService,
    getAllBudgetsService,
    getBudgetByIdService,
    updateBudgetService,
    deleteBudgetService
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

// get budget by id
export const getBudgetByIdController = async (req, res) => {
    const budgetId = req.params.id
    try {
        const budget = await getBudgetByIdService(budgetId);
        res.json(budget)
    }catch (error) {
        res.status(404).json({error: error.message})
    }
}

// update budget
export const updateBudgetController = async (req, res) => {
    const budgetId = req.params.id;
    const {grade_id, cost, total, name} = req.body;
    try {
        await  updateBudgetService(budgetId, grade_id, cost, total, name);
        res.json({ message: 'User updated successfully', budget: req.body })
    } catch (error) {
        res.status(500).json({error: "error in controller"})
    }
}

// delete budget
export const deleteBudgetController = async (req, res) => {
    const budgetId = req.params.id
    try{
        await deleteBudgetService(budgetId);
        res.json({message: 'budget deleted successfully'})
    }catch (error) {
        res.status(500).json({error : 'error in controller'})
    }
}