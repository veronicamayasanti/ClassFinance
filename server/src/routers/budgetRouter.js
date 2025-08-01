import express from "express";
import {
    createBudgetController
} from "../controllers/budgetControllers.js";

const budgetRouter = express.Router()

budgetRouter.post('/budget/create', createBudgetController)

export default budgetRouter;