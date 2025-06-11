import express from "express"
import cors from "cors"
import bodyParser from 'body-parser';


import userRouter from "./src/routers/userRouter.js";

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json()); // Untuk JSON
app.use(bodyParser.urlencoded({ extended: true })); // Untuk URL encoded data


app.use('/api', userRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));