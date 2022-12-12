interface IMailProvider {
  sendMail: (
    to: string,
    subject: string,
    variables: { [key: string]: string },
    path: string
  ) => Promise<void>;
}

export { IMailProvider };
