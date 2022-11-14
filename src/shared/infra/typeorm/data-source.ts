import dotenv from "dotenv";
import { DataSource } from "typeorm";

import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { Category } from "../../../modules/cars/infra/typeorm/entities/Category";
import { Specification } from "../../../modules/cars/infra/typeorm/entities/Specification";
dotenv.config();

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "rentx",
  synchronize: false,
  logging: true,
  entities: [Category, Specification, User],
  subscribers: [],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});

export { dataSource };
