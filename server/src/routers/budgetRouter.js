import express from "express";
import {
    createBudgetController,
    getAllBudgetsController,
    getBudgetByIdController,
    updateBudgetController,
    deleteBudgetController
} from "../controllers/budgetControllers.js";

const budgetRouter = express.Router()

budgetRouter.post('/budget/create', createBudgetController)
budgetRouter.get('/budget', getAllBudgetsController)
budgetRouter.get('/budget/:id', getBudgetByIdController)
budgetRouter.put('/budget/:id', updateBudgetController)
budgetRouter.delete('/budget/:id', deleteBudgetController)

export default budgetRouter;