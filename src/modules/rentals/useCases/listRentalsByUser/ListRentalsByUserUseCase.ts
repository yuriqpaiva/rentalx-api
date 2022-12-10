import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private readonly rentalsRepository: RentalsRepository
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    if (!rentalsByUser) {
      throw new AppError("User does not have rentals.");
    }

    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase };
