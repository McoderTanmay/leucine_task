import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import "reflect-metadata"

dotenv.config();

const app = express();

app.use(express.josn());
app.use(urlencoded({extended:true}));

app.use(cors({
    origin:[" 192.168.224.1"],
    credentials: true
}));

app.listen(5000, ()=>{
    console.log("Servier is running on port 5000");
});