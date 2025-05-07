import express from "express";
import SymbolController from "../controllers/symbol.controller.js";

const router = express.Router();

router.get("/", SymbolController.getAll);
router.get("/:id", SymbolController.getById);
router.post("/", SymbolController.create);
router.put("/:id", SymbolController.update);
router.delete("/:id", SymbolController.delete);

export default router;

