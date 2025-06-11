import express from "express";
import {
    registerUserController,
    loginUserController,
    getAllUserController,
    updateUserController,
    deleteUserController
} from "../controllers/userControlllers.js";
const userRouter = express.Router()

userRouter.post('/user/register', registerUserController)
userRouter.post('/user/login', loginUserController)
userRouter.get('/user', getAllUserController)
userRouter.put('/user/:id', updateUserController);
userRouter.delete('/user/:id', deleteUserController);

export default userRouter;