"use server";

import { createTransport } from "nodemailer";
import { config } from "@/config";

const transporter = createTransport({
  host: config.email.host,
  secure: config.email.secure,
  port: config.email.port,
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (emailOptions: EmailOptions) => {
  if (!config.email.sender) {
    return;
  }

  const defaultOptions = {
    from: config.email.sender,
  };

  await transporter.sendMail({ ...defaultOptions, ...emailOptions });
};
