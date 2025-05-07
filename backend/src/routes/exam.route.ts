import express from "express";
import ExamController from "../controllers/exam.controller.js";

const router = express.Router();

router.get("/", ExamController.getAll);
router.get("/user/:userId", ExamController.getAllByUserId);
router.get("/:id", ExamController.getById);
router.post("/:userId", ExamController.create);
router.put("/:id", ExamController.update);
router.delete("/:id", ExamController.delete);
router.get("/current/:userId", (res, req) =>
    ExamController.filteredStatus(res, req, "in-progress")
);
router.get("/complete/:userId", (res, req) =>
    ExamController.filteredStatus(res, req, "completed")
);

export default router;
