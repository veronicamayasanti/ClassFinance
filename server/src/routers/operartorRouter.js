import express from "express";
import {
    createOperatorController
} from "../controllers/operatorController.js";

const operatorRouter = express.Router();

operatorRouter.post('/operator/register', createOperatorController);

export default  operatorRouter;