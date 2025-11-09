"use server";

import { render } from "@react-email/components";
import { sendEmail } from "./send-email";
import PasswordReset from "../components/password-reset";

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
