import express from "express";
import { addSoftware } from "../controllers/softwareController.js";
import { authRoles, authToken } from "../middleware/auth";

const router = express.Router();

router.post("/", authToken, authRoles("admin"), addSoftware);

export default router;