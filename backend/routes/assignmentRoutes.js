import express from "express"
import { createAssignment, deleteWorkspace, executeQuery, getAssignment, getAssignmentById, getHint }
from "../controller/assignmentController.js";

const router=express.Router();

router.post("/create",createAssignment);
router.get("/",getAssignment);
router.get("/:id", getAssignmentById);
router.post("/:id/execute", executeQuery);
router.delete("/:id/workspace", deleteWorkspace);
router.post("/:id/hint", getHint);

export default router;