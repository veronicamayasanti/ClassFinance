import express from "express";
import { getAllUsers, createUser} from "../controllers/userController.js";

const userRouter = express.Router()
userRouter.get('/users', getAllUsers);
userRouter.post('/users', createUser)

export default userRouter;