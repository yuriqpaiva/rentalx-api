import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private readonly usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private readonly dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(
      token,
      process.env.JWT_SECRET_REFRESH_TOKEN!
    ) as IPayload;

    const user_id = sub;

    const userToken =
      await this.usersTokenRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh Token does not exist!");
    }

    await this.usersTokenRepository.deleteById(userToken.id);

    const refresh_token = sign(
      { email },
      process.env.JWT_SECRET_REFRESH_TOKEN!,
      {
        subject: sub,
        expiresIn: auth.expires_in_refresh_token,
      }
    );

    const expires_date = this.dateProvider.addDays(
      auth.expires_in_refresh_days
    );

    await this.usersTokenRepository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    const newToken = sign({}, process.env.JWT_SECRET_TOKEN!, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return { token: newToken, refresh_token };
  }
}

export { RefreshTokenUseCase };
