import express from "express"
import { addNewProduct, deleteProduct, getAllProduct ,updateProductStatus} from "../controllers/productController.js"
import { isAdminAuthenticated,isCustomerAuthenticated } from "../middlewares/auth.middlewares.js";



const router = express.Router();

router.post("/addProduct",isAdminAuthenticated ,addNewProduct);
router.get("/allProduct", getAllProduct);
router.put("/update/:id",isAdminAuthenticated,updateProductStatus)
router.delete("/delete/:id",isAdminAuthenticated,deleteProduct)


export default router; 