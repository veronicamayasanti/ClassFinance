import express from "express";
import {
    registerUserController
} from "../controllers/userControlllers.js";
const userRouter = express.Router()

userRouter.post('/user/register', registerUserController)

export default userRouter;