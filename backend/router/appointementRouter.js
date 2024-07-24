import express from "express" 
import { getAllAppointments, postAppointment,deleteAppointment,updateAppointmentStatus } from "../controllers/appointmentController.js"
import { isCustomerAuthenticated,isAdminAuthenticated } from "../middlewares/auth.middlewares.js"

const router = express.Router();

router.post("/post",isCustomerAuthenticated,postAppointment)
router.get("/getAllAppointments",isAdminAuthenticated,getAllAppointments)
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);


export default router;