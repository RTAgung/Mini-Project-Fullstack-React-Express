import express from "express";
import UserRouter from "./user.route.js";

const router = express.Router();

router.use("/users", UserRouter);

export default router;
