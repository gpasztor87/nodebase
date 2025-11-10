import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import authConfig from "@/config/auth.config";

import prisma from "@/lib/db";

export const auth = betterAuth({
  ...authConfig,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  plugins: [nextCookies()],
});
