import express from "express";
import {
    createOperatorController,
    loginOperatorController
} from "../controllers/operatorController.js";

const operatorRouter = express.Router();

operatorRouter.post('/operator/register', createOperatorController);
operatorRouter.post('/operator/login', loginOperatorController);

export default  operatorRouter;