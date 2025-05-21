import { DataSource } from "typeorm";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})