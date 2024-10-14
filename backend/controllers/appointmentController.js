
import { User } from "../models/userSchema.js";
import ErrorHandler from "../utils/errorMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Appointment } from "../models/appointmentSchema.js";

export const postAppointment = asyncHandler(async(req,res,next)=>{
   const {firstName,
    lastName,
    email,
    phone,
    gender,
    appointment_date,
    department,
    person_firstName,
    person_lastName,
    hasVisited,
    complaintMessage
   
  }= req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !gender ||
    !appointment_date ||
    !department ||
    !person_firstName ||
    !person_lastName ||
    !complaintMessage
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isConflict = await User.find({
    firstName: person_firstName,
    lastName: person_lastName,
    role: "Person",
    personDepartment: department,
  });
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Person not found", 404));
  }
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
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
  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment Send!",
  });
});

export const getAllAppointments = asyncHandler(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
      success: true,
      appointments,
    });
  });

  export const updateAppointmentStatus = asyncHandler(
    async (req, res, next) => {
      const { id } = req.params;
      let appointment = await Appointment.findById(id);
      if (!appointment) {
        return next(new ErrorHandler("Appointment not found!", 404));
    }
      appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({
        success: true,
        message: "Appointment Status Updated!",
      });
    }
  );
  export const deleteAppointment = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      throw(new ApiError("Appointment Not Found!", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({
      success: true,
      message: "Appointment Deleted!",
    });
  });






