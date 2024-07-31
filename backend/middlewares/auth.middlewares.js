import {User} from "../models/userSchema.js"
import ApiError from "../utils/ApiError.js";
import {asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

// Middleware to authenticate dashboard users
export const isAdminAuthenticated = asyncHandler(
    async (req, res, next) => {
      const token = req.cookies.adminToken;
      if (!token) {
        throw (
          new ApiError("Dashboard User is not authenticated!", 400)
        );
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded._id);
      if (req.user.role !== "Admin") {
        throw(
          new ApiError(`${req.user.role} not authorized for this resource!`, 403)
        );
      }
      next();
    }
  );

  // Middleware to authenticate frontend users
export const isCustomerAuthenticated = asyncHandler(
    async (req, res, next) => {
      const token = req.cookies.customerToken;
      if (!token) {
       throw (
        new ApiError("User is not authenticated!", 400)); 
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded._id);
      if (req.user.role !== "Customer") {
        throw(
          new ApiError(`${req.user.role} not authorized for this resource!`, 403)
        );
      }
      next();
    }
  );  