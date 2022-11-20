import { Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { dataSource } from "@shared/infra/typeorm/data-source";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private readonly repository: Repository<Car>;

  constructor() {
    this.repository = dataSource.getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(
    license_plate: string
  ): Promise<Car | null | undefined> {
    const car = await this.repository.findOne({ where: { license_plate } });

    return car;
  }

  async findAvailable(
    brand?: string | undefined,
    category_id?: string | undefined,
    name?: string | undefined
  ): Promise<Car[] | null | undefined> {
    const carsQuery = this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand });
    }

    if (name) {
      carsQuery.andWhere("name = :name", { name });
    }

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car | null | undefined> {
    const [car] = await this.repository.find({ where: { id } });
    return car;
  }
}

export { CarsRepository };
