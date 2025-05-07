import express from "express";
import UserRouter from "./user.route.js";
import SymbolRouter from "./symbol.route.js";

const router = express.Router();

router.use("/users", UserRouter);
router.use("/symbols", SymbolRouter);

export default router;
