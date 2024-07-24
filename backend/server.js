import { config } from "dotenv";
import connectdb from "./db/dbconn.js";
import { app } from "./app.js";
import cloudinary from "cloudinary"

config({
  path: "./.env",
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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
