import express from "express";
import {
    createBudgetController,
    getAllBudgetsController,
    getBudgetByIdController,
    updateBudgetController
} from "../controllers/budgetControllers.js";

const budgetRouter = express.Router()

budgetRouter.post('/budget/create', createBudgetController)
budgetRouter.get('/budget', getAllBudgetsController)
budgetRouter.get('/budget/:id', getBudgetByIdController)
budgetRouter.put('/budget/:id', updateBudgetController)

export default budgetRouter;