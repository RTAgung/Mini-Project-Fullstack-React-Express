import express from "express";
import { Request, Response } from "express";
import ExamController from "../controllers/exam.controller.js";

const router = express.Router();

router.get("/", ExamController.getAll);
router.get("/user/:userId", ExamController.getAllByUserId);
router.get("/:id", ExamController.getById);
router.get("/current/:userId", (req: Request, res: Response) =>
    ExamController.filteredStatus(req, res, "in-progress")
);
router.get("/complete/:userId", (req: Request, res: Response) =>
    ExamController.filteredStatus(req, res, "completed")
);
router.post("/:userId", ExamController.create);
router.post("/start_session/:id", ExamController.startSession);
router.post("/next_question/:id", ExamController.nextQuestion);
router.post("/end_session/:id", ExamController.endSession);
router.post("/end/:id", ExamController.endExam);
router.put("/:id", ExamController.update);
router.delete("/:id", ExamController.delete);

export default router;
