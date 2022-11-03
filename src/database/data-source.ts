import dotenv from "dotenv";
import { DataSource } from "typeorm";

import { User } from "../modules/accounts/entities/User";
import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";
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
  entities: [Category, Specification, User],
  subscribers: [],
  migrations: ["./src/database/migrations/*.ts"],
});

export { dataSource };
