import { jest } from "@jest/globals";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { UserRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "473010",
      email: "uri@du.tf",
      name: "Jeffery Briggs",
      password: "1648",
    });

    await sendForgotPasswordMailUseCase.execute("uri@du.tf");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exist", () => {
    expect(async () => {
      await sendForgotPasswordMailUseCase.execute("Irene Harper");
    }).rejects.toEqual(new AppError("User does not exist"));
  });

  it("should be able to create an users token", async () => {
    const generateMailToken = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      driver_license: "473010",
      email: "uri@du.tf",
      name: "Jeffery Briggs",
      password: "1648",
    });

    await sendForgotPasswordMailUseCase.execute("uri@du.tf");

    expect(generateMailToken).toHaveBeenCalled();
  });
});
