import mongoose from "mongoose";
import { User } from "../models/userSchema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Appointment } from "../models/appointmentSchema.js";

export const postAppointment = asyncHandler(async(req,res)=>{
   const {firstName,
    lastName,
    email,
    phone,
    gender,
    appointment_date,
    department,
    person_firstName,
    person_lastName,
    productId,
    hasVisited,
    complaintMessage
   
  }= req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !gender ||
    !productId||
    !appointment_date ||
    !department ||
    !person_firstName ||
    !person_lastName ||
    !complaintMessage
  ) {
    throw (new ApiError("Please Fill Full Form!", 400));
  }
  const isConflict = await User.find({
    firstName: person_firstName,
    lastName: person_lastName,
    role: "Person",
    personDepartment: department,
  });
  if (isConflict.length === 0) {
    throw(new ApiError("person not found", 404));
  }

  if (isConflict.length > 1) {
    throw(
      new ApiError(
        "Persons Conflict! Please Contact Through Email Or Phone!",
        400
      )
    );
  }
  const personId = isConflict[0]._id;
  const customerId = req.user._id;
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    gender,
    productId,
    appointment_date,
    department,
    person: {
      firstName: person_firstName,
      lastName: person_lastName,
    },
    hasVisited,
    complaintMessage,
    personId,
    customerId,
  });
  res.status(200).json(
new ApiResponse(200,
    appointment,
    "Appointment Send!")
  );
});

export const getAllAppointments = asyncHandler(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json( new ApiResponse(200,
      appointments),
    );
  });

  export const updateAppointmentStatus = asyncHandler(
    async (req, res, next) => {
      const { id } = req.params;
      let appointment = await Appointment.findById(id);
      if (!appointment) {
        throw (new ApiError("Appointment not found!", 404));
      }
      appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json(new ApiResponse(200,"Appointment Status Updated!"));
    }
  );
  export const deleteAppointment = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      throw(new ApiError("Appointment Not Found!", 404));
    }
    await appointment.deleteOne();
    res.status(200).json(new ApiResponse(200,"Appointment Deleted!"));
  });






