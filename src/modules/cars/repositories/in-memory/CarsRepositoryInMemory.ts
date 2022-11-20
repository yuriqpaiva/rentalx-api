import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(
    license_plate: string
  ): Promise<Car | null | undefined> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[] | null | undefined> {
    const cars = this.cars.filter((car) => {
      if (
        car.available ??
        (brand && car.brand === brand) ??
        (category_id && car.category_id === category_id) ??
        (name && car.name === name)
      ) {
        return true;
      } else {
        return false;
      }
    });

    return cars;
  }
}

export { CarsRepositoryInMemory };
