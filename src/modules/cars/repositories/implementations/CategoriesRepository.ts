import { Repository } from "typeorm";

import { dataSource } from "../../../../database/data-source";
import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private readonly repository: Repository<Category>;

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.repository = dataSource.getRepository(Category);
  }

  public static getInstance(): CategoriesRepository {
    if (CategoriesRepository.INSTANCE === undefined) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.repository.findOneBy({ name });

    return await category;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }
}

export { CategoriesRepository };
