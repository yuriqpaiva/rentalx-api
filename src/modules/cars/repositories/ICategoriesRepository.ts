import { Category } from "../infra/typeorm/entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName: (name: string) => Promise<Category | null | undefined>;
  list: () => Promise<Category[]>;
  create: (data: ICreateCategoryDTO) => void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
