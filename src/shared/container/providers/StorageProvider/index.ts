import { container } from "tsyringe";

import { LocalStorageProvider } from "./implementations/LocalStorageProvider";
import { S3StorageProvider } from "./implementations/S3StorageProvider";
import { IStorageProvider } from "./IStorageProvider";

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

const diskEnv = process.env.DISK as "local" | "s3";

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[diskEnv]
);
