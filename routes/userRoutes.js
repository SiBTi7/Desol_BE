import express from "express";
import { userController } from "../controllers/index.js";
const router = express.Router();

router.post("/login", userController.loginUser);
router.post("/signup", userController.signupUser);

export default router;
