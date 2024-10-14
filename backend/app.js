import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import feedbackRouter from "./router/feedbackRouter.js"
import userRouter from "./router/userRouter.js"
import appointmentRouter from "./router/appointementRouter.js"
import { errorMiddleware } from "./utils/errorMiddleware.js"


const app = express()

app.use(
    cors({
        origin :[process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials:true,
      })
 );

 app.use(cookieParser())
 app.use(express.json())
 app.use(express.urlencoded({extended:true}))

 app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir: "/tmp/"
    })
 );

 app.use("/api/v1/feedback",feedbackRouter)
 app.use("/api/v1/user",userRouter)
 app.use("/api/v1/appointment",appointmentRouter)
 
 app.use(errorMiddleware);
 
 export {app}
    