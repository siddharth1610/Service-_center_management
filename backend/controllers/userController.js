import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { User } from "../models/userSchema.js";
import cloudinary from "cloudinary"
import fs from "fs"

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
        httpOnly:true,
        secure:true,
        sameSite: "None",
      })
      .json({
        success: true,
        message,
        user,
        token,
      });
  };

export const customerRegister = asyncHandler(async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      password,
      role,
    } = req.body;
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
      throw new ApiError("please fill form!!", 400);
    }
    let user = await User.findOne({ email });
    if (user) {
      throw new ApiError("User already Registered", 400);
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
  
    generateToken(user, "Login Successfully!", 201, res);
  });


  export const login = asyncHandler(async (req, res) => {
    const { email, password, confirmPassword, role } = req.body; //we send static value from frontend
    if (!email || !password || !confirmPassword || !role) {
      throw new ApiError("Please provide all details!!", 400);
    }
    if (password !== confirmPassword) {
      throw new ApiError("Password and confirm passowrd doesnt match!!", 400);
    }
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new ApiError("Invalid Password or Email", 400);
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      throw new ApiError("Invalid Password or Email", 400);
    }
    if (role !== user.role) {
      throw new ApiError(`User Not Found With This Role!`, 400);
    }
  
    generateToken(user, "Login Successfully!", 201, res);
  });

  export const addNewAdmin = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, dob, gender, password } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !dob ||
      !gender ||
      !password
    ) {
      throw new ApiError("Please Fill Full Form!", 400);
    }
  
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      throw new ApiError("Admin With This Email Already Exists!", 400);
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
    return res.status(200).json(new ApiResponse(200, {}, "New Admin Registered"));
  });

  export const getAllperson = asyncHandler(async (req, res, next) => {
    const persons = await User.find({ role: "Person" });
    return res.status(200).json(new ApiResponse(200, persons, "All Persons!!"));
  });

  export const getUserDetails = asyncHandler(async (req, res, next) => {
    const user = req.user;
    return res.status(200).json(new ApiResponse(200, user));
  });
  // Logout function for dashboard admin
export const logoutAdmin = asyncHandler(async (req, res) => {
    res
      .status(201)
      .cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: true,
        sameSite: "None",
      })
      .json(new ApiResponse(201, "Admin Logged Out Successfully."));
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
      .json(new ApiResponse(201, "Customer Logged Out Successfully."));
  });
   

  export const addNewperson = asyncHandler(async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      throw new ApiError("Person Avatar Required", 400);
    }
  
    const { personAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(personAvatar.mimetype)) {
      new ApiError("File Format Not Supported!", 400);
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
      throw new ApiError("Please Fill Full Form!", 400);
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      throw new ApiError("Person With This Email Already Exists!", 400);
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
      throw new ApiError("Failed To Upload Person Avatar To Cloudinary", 500);
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
    res.status(200).json(new ApiResponse(200, Persons, "New Person Registered"));
  });