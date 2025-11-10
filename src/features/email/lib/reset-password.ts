"use server";

import { render } from "@react-email/components";

import PasswordReset from "../components/password-reset";
import { sendEmail } from "./send-email";

export async function ResetPasswordEmail({
  user,
  url,
}: {
  user: { email: string; name: string };
  url: string;
}) {
  await sendEmail({
    to: user.email,
    subject: "Reset your password",
    html: await render(PasswordReset({ email: user.email, resetLink: url })),
  });
}
