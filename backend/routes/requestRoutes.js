import express from "express";
import { authRoles, authToken } from "../middleware/auth.js";
import { createRequest, manageRequest, getRequests } from "../controllers/requestController.js"

const router = express.Router();

router.post("/", authToken, authRoles("admin", "employee"), createRequest);
router.post("/:id", authToken, authRoles("admin", "manager"), manageRequest);
router.get("/getRequests", authToken, authRoles("employee", "manager", "admin"), getRequests);

export default router;