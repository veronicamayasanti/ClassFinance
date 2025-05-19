import express from "express"
import bodyParser from "body-parser";
import userRouter from "./src/routers/userRouter.js";

const app = express()
app.use(bodyParser.json())

app.use('/api', userRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));