import fs from "fs";

export const deleteFile = async (filename: string): Promise<void> => {
  try {
    await fs.promises.stat(filename);
  } catch (error) {}

  // unlink deletes a file
  await fs.promises.unlink(filename);
};
