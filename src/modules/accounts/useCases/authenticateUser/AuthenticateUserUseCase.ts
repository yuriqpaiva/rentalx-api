import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private readonly usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private readonly dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const {
      expires_in_token,
      expires_in_refresh_token,
      expires_in_refresh_days,
    } = auth;

    if (user === null || user === undefined) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, process.env.JWT_SECRET_TOKEN as string, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign(
      {
        email,
      },
      process.env.JWT_SECRET_REFRESH_TOKEN as string,
      {
        subject: user.id,
        expiresIn: expires_in_refresh_token,
      }
    );

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_in_refresh_days
    );

    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const tokenData: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token,
    };

    return tokenData;
  }
}

export { AuthenticateUserUseCase };
