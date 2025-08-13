import express from "express";
import {
    createBudgetController,
    getAllBudgetsController
} from "../controllers/budgetControllers.js";

const budgetRouter = express.Router()

budgetRouter.post('/budget/create', createBudgetController)
budgetRouter.get('/budget', getAllBudgetsController)

export default budgetRouter;