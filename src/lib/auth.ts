import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { config } from "@/config";
import prisma from "@/lib/db";
import { ResetPasswordEmail } from "@/features/email/lib/reset-password";
import { VerificationEmail } from "@/features/email/lib/verification";
import { socialProviders } from "@/features/auth/lib/providers";

export const auth = betterAuth({
  appName: config.site.name,
  baseURL: config.site.siteUrl,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: config.auth.sessionMaxAge,
      updateAge: config.auth.sessionUpdateAge,
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await ResetPasswordEmail({ user, url });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await VerificationEmail({ user, url });
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, url, newEmail }) => {
        // TODO
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        // TODO
      },
    },
  },
  socialProviders,
  plugins: [nextCookies()],
});
