import mongoose from "mongoose";
import validator from "validator";

const feedbackSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First name contain at least 3 Character"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last name contain at least 3 Character"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please provide a valid email"]
    },
    phone:{
        type:String,
        required:true,
        maxLenghth:[10,"Phone number must contain 10 Digits"],
        minLength:[10,"Phone number must contain 10 Digits"]
    },
    message:{
        type:String,
        required:true,
        minLength:[10,"Message must contain at least 10 chararacter"]
    }

})
export const Feedback = mongoose.model("Feedback",feedbackSchema)