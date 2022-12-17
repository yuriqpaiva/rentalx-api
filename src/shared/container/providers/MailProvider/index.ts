import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

const mailProviderEnv = process.env.MAIL_PROVIDER as "ethereal" | "ses";

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvider[mailProviderEnv]
);
