import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  findOpenRentalByCar: (car_id: string) => Promise<Rental | undefined | null>;
  findOpenRentalByUser: (user_id: string) => Promise<Rental | undefined | null>;
  create: ({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO) => Promise<Rental>;
  findById: (id: string) => Promise<Rental | undefined | null>;
  findByUser: (user_id: string) => Promise<Rental[] | undefined | null>;
}

export { IRentalsRepository };
