import express from "express"
import cors from "cors"

import userRouter from "./src/routers/siswaRouter.js";
import operatorRouter from "./src/routers/operartorRouter.js";
import adminRouter from "./src/routers/adminRouter.js";

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', userRouter)
app.use('/api', operatorRouter)
app.use('/api', adminRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));