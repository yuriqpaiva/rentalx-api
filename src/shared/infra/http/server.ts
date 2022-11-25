import { dataSource } from "../typeorm/data-source";
import { app } from "./app";

dataSource
  .initialize()
  .then(async () => {
    app.listen(3333, () => console.log("Server is running!"));
  })
  .catch((error) => console.log(error));
