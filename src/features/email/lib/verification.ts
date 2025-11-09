"use server";

import { render } from "@react-email/components";
import { sendEmail } from "./send-email";
import EmailVerification from "../components/email-verification";

export async function VerificationEmail({
  user,
  url,
}: {
  user: { email: string; name: string };
  url: string;
}) {
  await sendEmail({
    to: user.email,
    subject: "Confirm your email",
    html: await render(
      EmailVerification({
        email: user.email,
        confirmLink: url,
      }),
    ),
  });
}
