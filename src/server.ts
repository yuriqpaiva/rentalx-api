import express from "express";
import swaggerUi from "swagger-ui-express";

import { AppDataSource } from "./database/data-source";
import { router } from "./routes/";
import swaggerFile from "./swagger.json";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(express.json());

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
    app.use(router);

    app.listen(3333, () => console.log("Server is running!"));
  })
  .catch((error) => console.log(error));
