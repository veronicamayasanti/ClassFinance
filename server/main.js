import express from "express"
import bodyParser from "body-parser";
import userRouter from "./src/routers/siswaRouter.js";
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', userRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));