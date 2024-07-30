import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Feedback } from "../models/feedbackSchema.js";

export const sendFeedback = asyncHandler(async(req,res)=>{
    const {firstName,lastName,email,message,phone}=req.body
    console.log(req.body)

    if(!firstName|| !lastName || !email || !message || !phone){
        throw new ApiError(400, "All field are required")
    }

    await Feedback.create({
        firstName,lastName,email,message,phone
    })
    return res.status(200).json(
        new ApiResponse(200,{},"Message sent Succesfully")
    )
})

export const getAllFeedback = asyncHandler(async(req,res)=>{
const feedback =await Feedback.find();
return res.status(200).json(
    new ApiResponse(200,feedback)
)

}) 