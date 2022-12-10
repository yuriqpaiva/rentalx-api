import { IsNull, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { dataSource } from "@shared/infra/typeorm/data-source";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private readonly repository: Repository<Rental>;

  constructor() {
    this.repository = dataSource.getRepository(Rental);
  }

  async findOpenRentalByCar(
    car_id: string
  ): Promise<Rental | undefined | null> {
    const openByCar = await this.repository.findOne({
      where: { car_id, end_date: IsNull() },
    });

    return openByCar;
  }

  async findOpenRentalByUser(
    user_id: string
  ): Promise<Rental | undefined | null> {
    const openByUser = await this.repository.findOne({
      where: { user_id, end_date: IsNull() },
    });

    return openByUser;
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental | undefined | null> {
    const rental = await this.repository.findOne({ where: { id } });

    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[] | null | undefined> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ["car"],
    });

    return rentals;
  }
}

export { RentalsRepository };
