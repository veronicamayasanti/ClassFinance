import express from "express";
import {
    registerUser,
    loginSiswa,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/siswaController.js";
const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginSiswa)
userRouter.get('/users/:id', getUserById)
userRouter.put('/users/:id', updateUser)
userRouter.delete('/users/:id', deleteUser)

export default userRouter;