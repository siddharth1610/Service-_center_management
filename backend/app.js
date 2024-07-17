import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"

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

 export {app}
    