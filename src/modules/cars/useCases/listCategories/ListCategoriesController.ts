import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  constructor(private readonly listCategoriesUseCase: ListCategoriesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const allCategories = await this.listCategoriesUseCase.execute();

    return response.status(200).json(allCategories);
  }
}

export { ListCategoriesController };
