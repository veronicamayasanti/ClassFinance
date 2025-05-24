import express from "express";
import {
    registerSiswa,
    loginSiswa,
    updateUser,
    deleteUser
} from "../controllers/siswaController.js";
const userRouter = express.Router()

userRouter.post('/register', registerSiswa)
userRouter.post('/login', loginSiswa)
userRouter.put('/users/:id', updateUser)
userRouter.delete('/users/:id', deleteUser)

export default userRouter;