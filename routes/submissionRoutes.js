import express from "express";
import { submissionController } from "../controllers/index.js";
import multer from "../middleware/multerConfig.js";

const router = express.Router();

// router.post("/submission", multer.array("images"), submissionController.createSubmission);
router.post("/submission", submissionController.createSubmission);

export default router;
