import mongoose from "mongoose";

import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name Is Required!"],
    minLength: [3, "First Name Must Contain At Least 3 Characters!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name Is Required!"],
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Email Is Required!"],
    validate: [validator.isEmail, "Provide A Valid Email!"],
  },
  phone: {
    type: String,
    required: [true, "Phone Is Required!"],
    minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
  },
 
 
  gender: {
    type: String,
    required: [true, "Gender Is Required!"],
    enum: ["Male", "Female","Others"],
  },
  appointment_date: {
    type: String,
    required: [true, "Appointment Date Is Required!"],
  },
  department: {
    type: String,
    required: [true, "Department Name Is Required!"],
  },
  person: {
    firstName: {
      type: String,
      required: [true, "Person Name Is Required!"],
    },
    lastName: {
      type: String,
      required: [true, "Person Name Is Required!"],
    },
  },
  hasVisited: {
    type: Boolean,
    default: false,
  },
  complaintMessage: {
    type: String,
    required: [true, "Message Is Required!"],
  },
  productId: {
    type: String,
    required: [true, "Product id Is Required!"],
  },
  personId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Doctor Id Is Invalid!"],
  },
  customerId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Customer Id Is Required!"],
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);