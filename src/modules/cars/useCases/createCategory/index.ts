import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const createCategoryRepository = CategoriesRepository.getInstance();

const createCategoryUseCase = new CreateCategoryUseCase(
  createCategoryRepository
);

const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);

export { createCategoryController };
