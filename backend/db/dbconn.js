import mongoose from "mongoose";

const connectdb = async() =>{
    try{
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI,{
            dbName:"SERVICE_CENTER_MANAGEMENT"
        })
        console.log(`MONGODB CONNECTED!! DB HOST: ${connectionInstance.connection.host}`)
        //console.log(connectionInstance)
    }catch(error){
        console.log("MONGODB connection failed", error)
        process.exit(1)
    }
}

export default connectdb