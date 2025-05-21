import { DataSource } from "typeorm";
import { User } from "./entities/User.js";
import { Software } from "./entities/SoftwareEntity.js";
import { Request } from "./entities/RequestEntity.js";

const username = process.env.POSTGRES_USERNAME;
const password =  process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DATABASE;

export const ServerDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Tanmay@221133",
    database: "leucineAI",
    synchronize: true,
    logging: true,
    entities: [User, Software, Request],
    subscribers: [],
    migrations: [],
})

export const test = ()=>{
    console.log(process.env.POSTGRES_PASSWORD);
    
}