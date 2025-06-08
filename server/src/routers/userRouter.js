import express from "express";
import {
    registerUserController,
    loginUserController,
    getAllUserController
} from "../controllers/userControlllers.js";
const userRouter = express.Router()

userRouter.post('/user/register', registerUserController)
userRouter.post('/user/login', loginUserController)
userRouter.get('/users', getAllUserController)

export default userRouter;