import { config } from "dotenv";
import connectdb from "./db/dbconn.js";
import { app } from "./app.js";

config({
  path: "./.env",
});

connectdb()
.then(() => {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running at port : http://localhost:${process.env.PORT}`);
  })
})
.catch((error)=>{
    console.log("MONGO DB CONNECTION FAILED!!",error);
})
