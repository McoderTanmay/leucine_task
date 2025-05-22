import express from "express";
import { addSoftware, getAllSoftwares } from "../controllers/softwareController.js";
import { authRoles, authToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authToken, authRoles("admin"), addSoftware);
router.get("/getSoftwares", authToken, authRoles("employee", "admin", "manager"), getAllSoftwares);

export default router;