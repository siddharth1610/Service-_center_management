import ErrorHandler from "../utils/errorMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { User } from "../models/userSchema.js";
import cloudinary from "cloudinary";
import fs from "fs";

const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  // Determine the cookie name based on the user's role
  const cookieName = user.role === "Admin" ? "adminToken" : "customerToken";
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};

export const customerRegister = asyncHandler(async (req, res,next) => {
  const { firstName, lastName, email, phone, dob, gender, password, role } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !role
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role,
  });

  generateToken(user, "Login Successfully!", 200, res);
});

export const login = asyncHandler(async (req, res,next) => {
  const { email, password, confirmPassword, role } = req.body; //we send static value from frontend
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));;
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password & Confirm Password Do Not Match!", 400)
    );
  }
  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler(`User Not Found With This Role!`, 400));;
  }

  generateToken(user, "Login Successfully!", 201, res);
});

export const addNewAdmin = asyncHandler(async (req, res,next) => {
  const { firstName, lastName, email, phone, dob, gender, password } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});


export const getAllperson = asyncHandler(async (req, res, next) => {
  const persons = await User.find({ role: "Person" });
  res.status(200).json({
    success: true,
    persons,
  });
});
export const getUserDetails = asyncHandler(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

// Logout function for dashboard admin
export const logoutAdmin = asyncHandler(async (req, res) => {
  res
    .status(201)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure:true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully.",
    });
});
// Logout function for frontend Customer
export const logoutCustomer = asyncHandler(async (req, res) => {
  res
    .status(201)
    .cookie("customerToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "Customer Logged Out Successfully.",
    });
});

export const addNewperson = asyncHandler(async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Person Avatar Required!", 400));
  }

  const { personAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(personAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    personDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !personDepartment ||
    !personAvatar
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler("Person With This Email Already Exists!", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    personAvatar.tempFilePath
  );
  fs.unlinkSync(personAvatar.tempFilePath);
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Failed To Upload Person Avatar To Cloudinary", 500)
    );
  }
  const Persons = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Person",
    personDepartment,
    personAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New person Registered",
    Persons,
  });
});
