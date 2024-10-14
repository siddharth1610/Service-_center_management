import ErrorHandler from "../utils/errorMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Feedback } from "../models/feedbackSchema.js";

export const sendFeedback = asyncHandler(async(req,res)=>{
    const {firstName,lastName,email,message,phone}=req.body
    console.log(req.body)

    if(!firstName|| !lastName || !email || !message || !phone){
        return next(new ErrorHandler("Please Fill Full Form!",400))
  }

    await Feedback.create({
        firstName,lastName,email,message,phone
    })
    return res.status(200).json({
        success: true,
        message: "Message Send Successfully!",
      });
    });

export const getAllFeedback = asyncHandler(async(req,res)=>{
const feedback =await Feedback.find();
res.status(200).json({
    success: true,
    feedback,
  });
}); 