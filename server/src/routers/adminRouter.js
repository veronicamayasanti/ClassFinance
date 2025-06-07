import express from "express";
import {
    loginAdminController
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post('/admin/login', loginAdminController)

export default adminRouter;