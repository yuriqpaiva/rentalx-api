import dotenv from "dotenv";
import { DataSource } from "typeorm";
dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "rentx",
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: ["./src/database/migrations/*.ts"],
});

export { AppDataSource };
