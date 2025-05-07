import express from "express";
import ExamController from "../controllers/exam.controller.js";

const router = express.Router();

router.get("/", ExamController.getAll);
router.get("/:id", ExamController.getById);
router.post("/:userId", ExamController.create);
router.put("/:id", ExamController.update);
router.delete("/:id", ExamController.delete);

export default router;
