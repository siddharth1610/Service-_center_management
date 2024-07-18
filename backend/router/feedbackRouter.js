import express from "express"
import { sendFeedback,getAllFeedback } from "../controllers/feedbackController.js"

const router = express.Router();

router.post("/send",sendFeedback)
router.get("/getAllFeedback",getAllFeedback)

export default router
