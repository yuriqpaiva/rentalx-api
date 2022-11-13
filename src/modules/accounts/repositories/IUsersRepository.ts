import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create: (data: ICreateUserDTO) => Promise<void>;
  findByEmail: (email: string) => Promise<User | null | undefined>;
  findById: (id: string) => Promise<User | null | undefined>;
}

export { IUsersRepository };
