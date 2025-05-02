import express from "express";
import { addProduct, deleteProduct, getProducts } from "../controllers/Product.controller.js";

const router = express.Router();

router.get("/", getProducts)
router.post("/add", addProduct)
router.delete("/delete/:productId", deleteProduct)

export default router