import express from "express";
import TryoutSectionController from "../controllers/tryout_section.controller.js";

const router = express.Router();

router.get("/", TryoutSectionController.getAll);
router.get("/:id", TryoutSectionController.getById);
router.post("/", TryoutSectionController.create);
router.put("/:id", TryoutSectionController.update);
router.delete("/:id", TryoutSectionController.delete);

export default router;

