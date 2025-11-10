import { z } from "zod";

const EmailConfigSchema = z.object({
  host: z
    .string()
    .default("smtp.gmail.com")
    .describe("This is the SMTP host for the email provider"),

  secure: z
    .boolean()
    .default(false)
    .describe("This is whether the connection is secure or not."),

  port: z.coerce
    .number()
    .default(587)
    .describe("This is the port for the email provider. Normally 587 or 465."),

  from: z
    .email()
    .describe(
      "The email address of the sender. All email addresses can be plain or formatted.",
    ),

  auth: z.object({
    user: z
      .string()
      .min(1, "Missing MAIL_USERNAME")
      .describe(
        "This is the email account to send emails from. This is specific to the email provider.",
      ),

    pass: z
      .string()
      .min(1, "Missing MAIL_PASSWORD")
      .describe("This is the password for the email account."),
  }),
});

export type EmailConfig = z.infer<typeof EmailConfigSchema>;

const emailConfig: EmailConfig = EmailConfigSchema.parse({
  host: process.env.MAIL_HOST,
  secure: process.env.MAIL_SECURE === "true",
  port: process.env.MAIL_PORT,
  from: process.env.MAIL_FROM_ADDRESS,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export default emailConfig;
