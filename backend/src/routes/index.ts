import express from "express";
import UserRouter from "./user.route.js";
import SymbolRouter from "./symbol.route.js";
import TryoutSectionRouter from "./tryout_section.route.js";
import ExamRouter from "./exam.route.js";
import AuthRouter from "./auth.route.js";
import { tokenValidator } from "../middlewares/validators/token.validator.js";

const router = express.Router();

router.use("/users", tokenValidator, UserRouter);
router.use("/symbols", tokenValidator, SymbolRouter);
router.use("/tryout_sections", tokenValidator, TryoutSectionRouter);
router.use("/exams", tokenValidator, ExamRouter);
router.use("/auth", AuthRouter);

export default router;
