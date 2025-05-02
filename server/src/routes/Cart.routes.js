import express from "express";
import { addCart, getCarts } from "../controllers/Cart.controller.js";

const router = express.Router();

router.get("/:userId", getCarts)
router.post("/add", addCart)

export default router