import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app = express();

app.use(express.json());
app.use(urlencoded({extended:true}));

app.use(cors({
    origin:[" 192.168.224.1"],
    credentials: true
}));

export default app;