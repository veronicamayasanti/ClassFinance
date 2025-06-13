import express from "express";
import {
    registerUserController,
    loginUserController,
    getAllUserController,
    getUserByIdController,
    getUsersByRoleController,
    getUsersByGradeController,
    updateUserController,
    deleteUserController
} from "../controllers/userControlllers.js";
const userRouter = express.Router()

userRouter.post('/user/register', registerUserController)
userRouter.post('/user/login', loginUserController)
userRouter.get('/user', getAllUserController)
userRouter.get('/user/:id', getUserByIdController);
userRouter.get('/user/role/:roleId', getUsersByRoleController);
userRouter.get('/user/grade/:gradeId', getUsersByGradeController);
userRouter.put('/user/:id', updateUserController);
userRouter.delete('/user/:id', deleteUserController);

export default userRouter;