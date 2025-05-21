import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";

import USER_ROUTES from "./routes/authRoutes.js";
import SOFTWARE_ROUTES from "./routes/softwareRoutes.js";
import REQUEST_ROUTES from "./routes/requestRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(urlencoded({extended:true}));

app.use(cors({
    origin:[" 192.168.224.1"],
    credentials: true
}));

app.use("/api/auth", USER_ROUTES);
app.use("/api/software", SOFTWARE_ROUTES);
app.use("/app//requests", REQUEST_ROUTES);

export default app;