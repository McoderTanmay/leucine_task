import express from "express";
import { authRoles, authToken } from "../middleware/auth";
import { createRequest, manageRequest } from "../controllers/requestController.js"

const router = express.Router();

router.post("/", authToken, authRoles("admin", "employee"), createRequest);
router.post("/:id", authToken, authRoles("admin", "manager"), manageRequest);

export default router;