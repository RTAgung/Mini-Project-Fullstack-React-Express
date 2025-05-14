import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { tokenValidator } from "../middlewares/validators/token.validator.js";
import {
    loginValidator,
    registerValidator,
} from "../middlewares/validators/auth.validator.js";

const router = express.Router();

router.post("/login", loginValidator, AuthController.login);
router.post("/register", registerValidator, AuthController.register);
router.post("/logout", AuthController.logout);
router.post("/check", tokenValidator, AuthController.check);

export default router;
