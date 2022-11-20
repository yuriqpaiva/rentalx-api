import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create: ({ name, description }: ICreateSpecificationDTO) => Promise<void>;
  findByName: (name: string) => Promise<Specification | null | undefined>;
  findByIds: (ids: string[]) => Promise<Specification[]>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
