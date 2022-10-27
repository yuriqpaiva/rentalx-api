import dotenv from "dotenv";
import { DataSource } from "typeorm";

import { Category } from "../modules/cars/entities/Category";
dotenv.config();

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "rentx",
  synchronize: true,
  logging: true,
  entities: [Category],
  subscribers: [],
  migrations: ["./src/database/migrations/*.ts"],
});

export { dataSource };
