import { parse as csvParse } from "csv-parse";
import fs from "fs";

class ImportCategoryUseCase {
  execute(file: Express.Multer.File): void {
    const stream = fs.createReadStream(file?.path);

    const parseFile = csvParse();

    // Read our file chunk by chunk and parses it (convert to JS structure)
    stream.pipe(parseFile);

    parseFile.on("data", (line) => {
      console.log(line);
    });
  }
}

export { ImportCategoryUseCase };
