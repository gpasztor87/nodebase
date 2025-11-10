"use server";

import { createTransport } from "nodemailer";
import emailConfig from "@/config/email.config";

const transporter = createTransport(emailConfig);

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (emailOptions: EmailOptions) => {
  const defaultOptions = {
    from: emailConfig.from,
  };

  await transporter.sendMail({ ...defaultOptions, ...emailOptions });
};
