class ImportCategoryUseCase {
  execute(file: Express.Multer.File | undefined): void {
    console.log(file);
  }
}

export { ImportCategoryUseCase };
