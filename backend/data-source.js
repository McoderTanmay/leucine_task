import { DataSource } from "typeorm";
import { User } from "./entities/User.js";
import { Software } from "./entities/SoftwareEntity.js";
import { Request } from "./entities/RequestEntity.js";
import dotenv from "dotenv";

dotenv.config();


const username = process.env.POSTGRES_USERNAME;
const password =  process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DATABASE;

export const ServerDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: username,
    password: password,
    database: database,
    synchronize: true,
    logging: true,
    entities: [User, Software, Request],
    subscribers: [],
    migrations: [],
})

export const test = ()=>{
    console.log(process.env.POSTGRES_PASSWORD);
    
}