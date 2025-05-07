import express from "express";
import UserRouter from "./user.route.js";
import SymbolRouter from "./symbol.route.js";
import TryoutSectionRouter from "./tryout_section.route.js";
import ExamRouter from "./exam.route.js";

const router = express.Router();

router.use("/users", UserRouter);
router.use("/symbols", SymbolRouter);
router.use("/tryout_sections", TryoutSectionRouter);
router.use("/exams", ExamRouter);

export default router;
