import express from "express"
import { addNewAdmin, addNewperson, customerRegister, getAllperson, getUserDetails, login, logoutAdmin, logoutCustomer } from "../controllers/userController.js"
import { isAdminAuthenticated,isCustomerAuthenticated } from "../middlewares/auth.middlewares.js";

const router = express.Router();


router.post("/customer/register",customerRegister)
router.post("/login",login)
router.post("/admin/addnewadmin",isAdminAuthenticated,addNewAdmin)
router.get("/allperson",getAllperson)
router.get("/admin",isAdminAuthenticated,getUserDetails)
router.get("/customer",isCustomerAuthenticated,getUserDetails)
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/customer/logout", isCustomerAuthenticated, logoutCustomer);
router.post("/admin/addNewPerson", isAdminAuthenticated, addNewperson);


export default router;