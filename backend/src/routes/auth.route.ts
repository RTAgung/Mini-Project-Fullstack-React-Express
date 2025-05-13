import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { tokenValidator } from "../middlewares/validators/token.validator.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/logout", AuthController.logout);
router.post("/check", tokenValidator, AuthController.check);

export default router;
