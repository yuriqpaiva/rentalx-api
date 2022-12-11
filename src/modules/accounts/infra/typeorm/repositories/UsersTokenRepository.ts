import { Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { dataSource } from "@shared/infra/typeorm/data-source";

import { UserTokens } from "../entities/UserTokens";

class UsersTokenRepository implements IUsersTokenRepository {
  private readonly repository: Repository<UserTokens>;

  constructor() {
    this.repository = dataSource.getRepository(UserTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export { UsersTokenRepository };
